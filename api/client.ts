/**
 * API 客户端配置
 * 封装与后端 API 的通信
 */

// API 基础 URL
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

/**
 * 通用请求函数
 * 封装 fetch 请求，统一处理错误
 */
async function request<T>(
    endpoint: string,
    options: RequestInit = {}
): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;

    const defaultHeaders: HeadersInit = {
        'Content-Type': 'application/json',
    };

    const config: RequestInit = {
        ...options,
        headers: {
            ...defaultHeaders,
            ...options.headers,
        },
    };

    try {
        const response = await fetch(url, config);

        if (!response.ok) {
            const error = await response.json().catch(() => ({}));
            throw new Error(error.detail || `请求失败: ${response.status}`);
        }

        return response.json();
    } catch (error) {
        console.error(`API 请求错误 [${endpoint}]:`, error);
        throw error;
    }
}

/**
 * GET 请求
 */
export async function get<T>(endpoint: string): Promise<T> {
    return request<T>(endpoint, { method: 'GET' });
}

/**
 * POST 请求
 */
export async function post<T>(endpoint: string, data?: unknown): Promise<T> {
    return request<T>(endpoint, {
        method: 'POST',
        body: data ? JSON.stringify(data) : undefined,
    });
}

/**
 * DELETE 请求
 */
export async function del<T>(endpoint: string): Promise<T> {
    return request<T>(endpoint, { method: 'DELETE' });
}

/**
 * PATCH 请求
 */
export async function patch<T>(endpoint: string, data?: unknown): Promise<T> {
    return request<T>(endpoint, {
        method: 'PATCH',
        body: data ? JSON.stringify(data) : undefined,
    });
}

export { API_BASE_URL };

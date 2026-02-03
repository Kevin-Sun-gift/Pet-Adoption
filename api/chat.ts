/**
 * AI 聊天 API 服务
 */

import { post } from './client';
import type { Message } from '../types';

interface ChatRequest {
    pet_id: string;
    messages: Message[];
}

interface ChatResponse {
    response: string;
}

/**
 * 发送聊天消息并获取 AI 回复
 */
export async function sendChatMessage(
    petId: string,
    messages: Message[]
): Promise<string> {
    const request: ChatRequest = {
        pet_id: petId,
        messages: messages.map(msg => ({
            role: msg.role,
            text: msg.text,
            time: msg.time,
        })),
    };

    const response = await post<ChatResponse>('/chat', request);
    return response.response;
}

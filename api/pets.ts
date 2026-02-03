/**
 * 宠物 API 服务
 */

import { get } from './client';
import type { Pet, Story } from '../types';

interface PetListResponse {
    data: Pet[];
    total: number;
}

interface StoryListResponse {
    data: Story[];
    total: number;
}

/**
 * 获取宠物列表
 * @param type 宠物类型筛选 (all, dog, cat, rabbit)
 * @param search 搜索关键词
 */
export async function fetchPets(
    type?: string,
    search?: string
): Promise<Pet[]> {
    const params = new URLSearchParams();
    if (type && type !== 'all') {
        params.append('type', type);
    }
    if (search) {
        params.append('search', search);
    }

    const queryString = params.toString();
    const endpoint = `/pets${queryString ? `?${queryString}` : ''}`;

    const response = await get<PetListResponse>(endpoint);
    return response.data;
}

/**
 * 获取单个宠物详情
 */
export async function fetchPetById(petId: string): Promise<Pet> {
    return get<Pet>(`/pets/${petId}`);
}

/**
 * 获取故事列表
 */
export async function fetchStories(): Promise<Story[]> {
    const response = await get<StoryListResponse>('/pets/stories/list');
    return response.data;
}

/**
 * 收藏 API 服务
 */

import { get, post, del } from './client';

// 默认用户 ID（无认证模式）
const DEFAULT_USER_ID = 'default_user';

interface FavoritesResponse {
    pet_ids: string[];
    data: Array<{
        id: string;
        user_id: string;
        pet_id: string;
    }>;
}

/**
 * 获取用户收藏的宠物 ID 列表
 */
export async function fetchFavorites(userId: string = DEFAULT_USER_ID): Promise<string[]> {
    const response = await get<FavoritesResponse>(`/favorites/${userId}`);
    return response.pet_ids;
}

/**
 * 添加收藏
 */
export async function addFavorite(petId: string, userId: string = DEFAULT_USER_ID): Promise<void> {
    await post('/favorites', { user_id: userId, pet_id: petId });
}

/**
 * 取消收藏
 */
export async function removeFavorite(petId: string, userId: string = DEFAULT_USER_ID): Promise<void> {
    await del(`/favorites/${userId}/${petId}`);
}

/**
 * 切换收藏状态
 * 如果已收藏则取消，否则添加
 */
export async function toggleFavorite(
    petId: string,
    isCurrentlyFavorited: boolean,
    userId: string = DEFAULT_USER_ID
): Promise<void> {
    if (isCurrentlyFavorited) {
        await removeFavorite(petId, userId);
    } else {
        await addFavorite(petId, userId);
    }
}

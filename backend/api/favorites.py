"""
收藏相关 API 路由
"""

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, Field
from repository.supabase_client import supabase

router = APIRouter(prefix="/favorites", tags=["收藏"])


class FavoriteRequest(BaseModel):
    """收藏请求"""
    user_id: str = Field(..., description="用户ID")
    pet_id: str = Field(..., description="宠物ID")


class FavoriteResponse(BaseModel):
    """收藏响应"""
    id: str
    user_id: str
    pet_id: str


@router.get("/{user_id}")
async def get_user_favorites(user_id: str):
    """
    获取用户的收藏列表
    """
    response = supabase.table("favorites")\
        .select("*, pets(*)")\
        .eq("user_id", user_id)\
        .execute()
    
    # 提取宠物 ID 列表
    pet_ids = [item["pet_id"] for item in response.data]
    return {"pet_ids": pet_ids, "data": response.data}


@router.post("", response_model=FavoriteResponse)
async def add_favorite(request: FavoriteRequest):
    """
    添加收藏
    """
    try:
        response = supabase.table("favorites").insert({
            "user_id": request.user_id,
            "pet_id": request.pet_id
        }).execute()
        
        if response.data:
            return response.data[0]
        raise HTTPException(status_code=400, detail="添加收藏失败")
    except Exception as e:
        # 处理重复收藏的情况
        if "duplicate" in str(e).lower():
            raise HTTPException(status_code=400, detail="已经收藏过该宠物")
        raise HTTPException(status_code=500, detail=str(e))


@router.delete("/{user_id}/{pet_id}")
async def remove_favorite(user_id: str, pet_id: str):
    """
    取消收藏
    """
    response = supabase.table("favorites")\
        .delete()\
        .eq("user_id", user_id)\
        .eq("pet_id", pet_id)\
        .execute()
    
    return {"success": True, "message": "已取消收藏"}

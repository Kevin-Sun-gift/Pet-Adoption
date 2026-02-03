"""
宠物相关 API 路由
"""

from typing import Optional
from fastapi import APIRouter, HTTPException, Query

from schema.pet import PetResponse, PetListResponse
from service import pet_service

router = APIRouter(prefix="/pets", tags=["宠物"])


@router.get("", response_model=PetListResponse)
async def get_pets(
    type: Optional[str] = Query(None, description="宠物类型: all, dog, cat, rabbit"),
    search: Optional[str] = Query(None, description="搜索关键词")
):
    """
    获取宠物列表
    支持按类型筛选和关键词搜索
    """
    pets = pet_service.get_all_pets(pet_type=type, search=search)
    return PetListResponse(data=pets, total=len(pets))


@router.get("/{pet_id}", response_model=PetResponse)
async def get_pet(pet_id: str):
    """
    获取单个宠物详情
    """
    pet = pet_service.get_pet_by_id(pet_id)
    if not pet:
        raise HTTPException(status_code=404, detail="宠物不存在")
    return pet


@router.get("/stories/list")
async def get_stories():
    """
    获取故事列表
    """
    stories = pet_service.get_all_stories()
    return {"data": stories, "total": len(stories)}

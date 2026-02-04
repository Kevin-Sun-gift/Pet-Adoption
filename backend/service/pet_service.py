"""
宠物业务逻辑服务
"""

from typing import Optional
from repository.supabase_client import supabase


def get_all_pets(
    pet_type: Optional[str] = None,
    search: Optional[str] = None
) -> list[dict]:
    """
    获取所有宠物列表
    支持按类型筛选和搜索
    注意：已领养的宠物（is_adopted=true）不在 App 端显示
    """
    query = supabase.table("pets").select("*")
    
    # 过滤已领养的宠物（App 端不显示）
    query = query.eq("is_adopted", False)
    
    # 按类型筛选
    if pet_type and pet_type != "all":
        query = query.eq("type", pet_type)
    
    # 搜索（名称或品种）
    if search:
        query = query.or_(f"name.ilike.%{search}%,breed.ilike.%{search}%")
    
    response = query.order("created_at", desc=True).execute()
    return response.data


def get_pet_by_id(pet_id: str) -> Optional[dict]:
    """
    根据 ID 获取单个宠物
    """
    response = supabase.table("pets").select("*").eq("id", pet_id).single().execute()
    return response.data


def create_pet(pet_data: dict) -> dict:
    """
    创建新宠物记录
    """
    response = supabase.table("pets").insert(pet_data).execute()
    return response.data[0] if response.data else {}


def get_all_stories() -> list[dict]:
    """
    获取所有故事
    """
    response = supabase.table("stories").select("*").execute()
    return response.data

"""
宠物管理服务
"""

from typing import Optional
from repository.supabase_client import supabase


def get_all_pets(include_adopted: bool = True) -> list[dict]:
    """
    获取所有宠物（管理后台显示全部）
    
    Args:
        include_adopted: 是否包含已领养的宠物
    """
    query = supabase.table("pets").select("*").order("created_at", desc=True)
    
    if not include_adopted:
        query = query.eq("is_adopted", False)
    
    response = query.execute()
    return response.data


def get_pet_by_id(pet_id: str) -> Optional[dict]:
    """获取单个宠物详情"""
    response = supabase.table("pets")\
        .select("*")\
        .eq("id", pet_id)\
        .single()\
        .execute()
    return response.data


def create_pet(pet_data: dict) -> dict:
    """创建新宠物"""
    # 确保默认值
    pet_data.setdefault("is_adopted", False)
    pet_data.setdefault("health", [])
    pet_data.setdefault("owner", {"name": "管理员", "role": "Staff", "avatar": ""})
    
    response = supabase.table("pets").insert(pet_data).execute()
    return response.data[0] if response.data else {}


def update_pet(pet_id: str, pet_data: dict) -> Optional[dict]:
    """更新宠物信息"""
    response = supabase.table("pets")\
        .update(pet_data)\
        .eq("id", pet_id)\
        .execute()
    return response.data[0] if response.data else None


def delete_pet(pet_id: str) -> bool:
    """删除宠物"""
    response = supabase.table("pets")\
        .delete()\
        .eq("id", pet_id)\
        .execute()
    return len(response.data) > 0


def mark_pet_adopted(pet_id: str, adopted: bool = True) -> Optional[dict]:
    """标记宠物为已领养（App 端下线）"""
    return update_pet(pet_id, {"is_adopted": adopted})

"""
领养申请业务逻辑服务
"""

from typing import Optional
from repository.supabase_client import supabase


def create_application(application_data: dict) -> dict:
    """
    创建领养申请
    """
    response = supabase.table("applications").insert(application_data).execute()
    return response.data[0] if response.data else {}


def get_applications_by_pet(pet_id: str) -> list[dict]:
    """
    获取某个宠物的所有申请
    """
    response = supabase.table("applications")\
        .select("*")\
        .eq("pet_id", pet_id)\
        .order("created_at", desc=True)\
        .execute()
    return response.data


def get_application_by_id(application_id: str) -> Optional[dict]:
    """
    根据 ID 获取申请详情
    """
    response = supabase.table("applications")\
        .select("*")\
        .eq("id", application_id)\
        .single()\
        .execute()
    return response.data


def update_application_status(application_id: str, status: str) -> dict:
    """
    更新申请状态
    """
    response = supabase.table("applications")\
        .update({"status": status})\
        .eq("id", application_id)\
        .execute()
    return response.data[0] if response.data else {}

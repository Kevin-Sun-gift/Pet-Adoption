"""
领养申请审批服务
"""

from typing import Optional
from datetime import datetime
from repository.supabase_client import supabase
from service import pet_service


def get_all_applications(status: Optional[str] = None) -> list[dict]:
    """
    获取所有申请
    
    Args:
        status: 筛选状态 (pending/approved/rejected)
    """
    query = supabase.table("applications")\
        .select("*, pets(id, name, image, breed)")\
        .order("created_at", desc=True)
    
    if status:
        query = query.eq("status", status)
    
    response = query.execute()
    return response.data


def get_application_by_id(application_id: str) -> Optional[dict]:
    """获取申请详情"""
    response = supabase.table("applications")\
        .select("*, pets(*)")\
        .eq("id", application_id)\
        .single()\
        .execute()
    return response.data


def approve_application(application_id: str, review_note: str = "") -> dict:
    """
    批准领养申请
    
    1. 更新申请状态为 approved
    2. 标记宠物为已领养（App 端下线）
    3. 创建通知
    """
    # 获取申请信息
    application = get_application_by_id(application_id)
    if not application:
        raise ValueError("申请不存在")
    
    if application["status"] != "pending":
        raise ValueError("该申请已处理")
    
    # 1. 更新申请状态
    supabase.table("applications").update({
        "status": "approved",
        "reviewed_at": datetime.now().isoformat(),
        "review_note": review_note
    }).eq("id", application_id).execute()
    
    # 2. 标记宠物为已领养
    pet_service.mark_pet_adopted(application["pet_id"], True)
    
    # 3. 创建通知
    pet_name = application.get("pets", {}).get("name", "宠物")
    create_notification(
        user_phone=application["phone"],
        pet_id=application["pet_id"],
        application_id=application_id,
        title="🎉 领养申请已通过",
        content=f"恭喜！您对 {pet_name} 的领养申请已通过审核。请尽快与我们联系，安排接宠事宜。",
        notification_type="adoption_approved"
    )
    
    return {"success": True, "message": "申请已批准"}


def reject_application(application_id: str, review_note: str = "") -> dict:
    """
    拒绝领养申请
    """
    application = get_application_by_id(application_id)
    if not application:
        raise ValueError("申请不存在")
    
    if application["status"] != "pending":
        raise ValueError("该申请已处理")
    
    # 更新申请状态
    supabase.table("applications").update({
        "status": "rejected",
        "reviewed_at": datetime.now().isoformat(),
        "review_note": review_note
    }).eq("id", application_id).execute()
    
    # 创建通知
    pet_name = application.get("pets", {}).get("name", "宠物")
    create_notification(
        user_phone=application["phone"],
        pet_id=application["pet_id"],
        application_id=application_id,
        title="领养申请未通过",
        content=f"很抱歉，您对 {pet_name} 的领养申请未能通过审核。{review_note if review_note else '欢迎您继续浏览其他宠物。'}",
        notification_type="adoption_rejected"
    )
    
    return {"success": True, "message": "申请已拒绝"}


def create_notification(
    user_phone: str,
    pet_id: str,
    application_id: str,
    title: str,
    content: str,
    notification_type: str = "system"
) -> dict:
    """创建通知"""
    response = supabase.table("notifications").insert({
        "user_phone": user_phone,
        "pet_id": pet_id,
        "application_id": application_id,
        "title": title,
        "content": content,
        "type": notification_type,
        "is_read": False
    }).execute()
    return response.data[0] if response.data else {}

"""
领养申请审批 API 路由
"""

from typing import Optional
from fastapi import APIRouter, HTTPException, Query
from pydantic import BaseModel

from service import application_service

router = APIRouter(prefix="/applications", tags=["申请审批"])


class ReviewRequest(BaseModel):
    """审批请求"""
    review_note: Optional[str] = ""


@router.get("")
async def get_applications(
    status: Optional[str] = Query(None, description="状态筛选: pending/approved/rejected")
):
    """获取所有申请"""
    applications = application_service.get_all_applications(status=status)
    return {"data": applications, "total": len(applications)}


@router.get("/{application_id}")
async def get_application(application_id: str):
    """获取申请详情"""
    application = application_service.get_application_by_id(application_id)
    if not application:
        raise HTTPException(status_code=404, detail="申请不存在")
    return application


@router.post("/{application_id}/approve")
async def approve_application(application_id: str, request: ReviewRequest):
    """
    批准领养申请
    
    - 更新申请状态为 approved
    - 标记宠物为已领养（App 端下线）
    - 发送通知给申请人
    """
    try:
        result = application_service.approve_application(
            application_id, 
            review_note=request.review_note
        )
        return result
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.post("/{application_id}/reject")
async def reject_application(application_id: str, request: ReviewRequest):
    """
    拒绝领养申请
    
    - 更新申请状态为 rejected
    - 发送通知给申请人
    """
    try:
        result = application_service.reject_application(
            application_id,
            review_note=request.review_note
        )
        return result
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))

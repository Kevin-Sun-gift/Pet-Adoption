"""
领养申请 API 路由
"""

from fastapi import APIRouter, HTTPException

from schema.application import ApplicationCreate, ApplicationResponse, ApplicationListResponse
from service import application_service

router = APIRouter(prefix="/applications", tags=["领养申请"])


@router.post("", response_model=ApplicationResponse)
async def create_application(request: ApplicationCreate):
    """
    提交领养申请
    """
    application_data = request.model_dump()
    result = application_service.create_application(application_data)
    
    if not result:
        raise HTTPException(status_code=400, detail="申请提交失败")
    
    return result


@router.get("/pet/{pet_id}", response_model=ApplicationListResponse)
async def get_pet_applications(pet_id: str):
    """
    获取某个宠物的所有申请
    """
    applications = application_service.get_applications_by_pet(pet_id)
    return ApplicationListResponse(data=applications, total=len(applications))


@router.get("/{application_id}", response_model=ApplicationResponse)
async def get_application(application_id: str):
    """
    获取申请详情
    """
    application = application_service.get_application_by_id(application_id)
    if not application:
        raise HTTPException(status_code=404, detail="申请不存在")
    return application


@router.patch("/{application_id}/status")
async def update_status(application_id: str, status: str):
    """
    更新申请状态
    """
    if status not in ["pending", "approved", "rejected"]:
        raise HTTPException(status_code=400, detail="无效的状态值")
    
    result = application_service.update_application_status(application_id, status)
    if not result:
        raise HTTPException(status_code=404, detail="申请不存在")
    
    return {"success": True, "data": result}

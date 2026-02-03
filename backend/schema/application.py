"""
领养申请数据模型定义
"""

from typing import Optional
from pydantic import BaseModel, Field


class ApplicationCreate(BaseModel):
    """创建领养申请请求"""
    pet_id: str = Field(..., description="宠物ID")
    applicant_name: str = Field(..., max_length=100, description="申请人姓名")
    phone: str = Field(..., max_length=20, description="联系电话")
    occupation: Optional[str] = Field(None, max_length=100, description="职业")
    reason: Optional[str] = Field(None, description="领养理由")
    has_pets: bool = Field(False, description="家中是否有其他宠物")
    family_agreed: bool = Field(False, description="家人是否同意")
    accept_followup: bool = Field(False, description="是否接受回访")
    environment_photos: list[str] = Field(default_factory=list, description="居住环境照片URL列表")


class ApplicationResponse(ApplicationCreate):
    """领养申请响应模型"""
    id: str
    status: str = "pending"
    created_at: Optional[str] = None

    class Config:
        from_attributes = True


class ApplicationListResponse(BaseModel):
    """申请列表响应"""
    data: list[ApplicationResponse]
    total: int

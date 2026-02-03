"""
宠物数据模型定义
使用 Pydantic 进行数据校验
"""

from typing import Optional
from pydantic import BaseModel, Field


class Owner(BaseModel):
    """宠物主人/送养人信息"""
    name: str
    role: str
    avatar: str = ""


class PetBase(BaseModel):
    """宠物基础信息"""
    name: str = Field(..., max_length=100, description="宠物名称")
    breed: str = Field(..., max_length=100, description="品种")
    type: str = Field(..., pattern="^(dog|cat|rabbit|other)$", description="类型")
    gender: str = Field(..., pattern="^(male|female)$", description="性别")
    age: str = Field(..., max_length=50, description="年龄")
    weight: Optional[str] = Field(None, max_length=50, description="体重")
    distance: str = Field(..., max_length=50, description="距离")
    price: int = Field(0, ge=0, description="领养费用")
    description: Optional[str] = Field(None, description="描述")
    image: str = Field(..., max_length=500, description="图片URL")
    location: str = Field(..., max_length=200, description="所在地")
    owner: Owner = Field(..., description="主人/送养人信息")
    health: list[str] = Field(default_factory=list, description="健康状况标签")


class PetCreate(PetBase):
    """创建宠物请求"""
    pass


class PetResponse(PetBase):
    """宠物响应模型"""
    id: str

    class Config:
        from_attributes = True


class PetListResponse(BaseModel):
    """宠物列表响应"""
    data: list[PetResponse]
    total: int

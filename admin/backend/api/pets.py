"""
宠物管理 API 路由
"""

from typing import Optional
from fastapi import APIRouter, HTTPException, Query
from pydantic import BaseModel, Field

from service import pet_service

router = APIRouter(prefix="/pets", tags=["宠物管理"])


class PetCreate(BaseModel):
    """创建宠物请求"""
    name: str = Field(..., max_length=100, description="宠物名称")
    breed: str = Field(..., max_length=100, description="品种")
    type: str = Field(..., description="类型: dog/cat/rabbit/other")
    gender: str = Field(..., description="性别: male/female")
    age: str = Field(..., description="年龄")
    weight: Optional[str] = Field(None, description="体重")
    distance: str = Field(..., description="距离")
    price: int = Field(0, description="领养费用")
    location: str = Field(..., description="位置")
    description: Optional[str] = Field(None, description="描述")
    image: str = Field(..., description="图片URL")
    health: list[str] = Field(default_factory=list, description="健康状态标签")


class PetUpdate(BaseModel):
    """更新宠物请求"""
    name: Optional[str] = None
    breed: Optional[str] = None
    type: Optional[str] = None
    gender: Optional[str] = None
    age: Optional[str] = None
    weight: Optional[str] = None
    distance: Optional[str] = None
    price: Optional[int] = None
    location: Optional[str] = None
    description: Optional[str] = None
    image: Optional[str] = None
    health: Optional[list[str]] = None


@router.get("")
async def get_pets(
    include_adopted: bool = Query(True, description="是否包含已领养的宠物")
):
    """获取所有宠物（管理后台）"""
    pets = pet_service.get_all_pets(include_adopted=include_adopted)
    return {"data": pets, "total": len(pets)}


@router.get("/{pet_id}")
async def get_pet(pet_id: str):
    """获取单个宠物详情"""
    pet = pet_service.get_pet_by_id(pet_id)
    if not pet:
        raise HTTPException(status_code=404, detail="宠物不存在")
    return pet


@router.post("")
async def create_pet(request: PetCreate):
    """创建新宠物"""
    pet_data = request.model_dump()
    result = pet_service.create_pet(pet_data)
    if not result:
        raise HTTPException(status_code=400, detail="创建失败")
    return {"success": True, "data": result}


@router.put("/{pet_id}")
async def update_pet(pet_id: str, request: PetUpdate):
    """更新宠物信息"""
    # 只更新非空字段
    update_data = {k: v for k, v in request.model_dump().items() if v is not None}
    if not update_data:
        raise HTTPException(status_code=400, detail="没有要更新的字段")
    
    result = pet_service.update_pet(pet_id, update_data)
    if not result:
        raise HTTPException(status_code=404, detail="宠物不存在")
    return {"success": True, "data": result}


@router.delete("/{pet_id}")
async def delete_pet(pet_id: str):
    """删除宠物"""
    success = pet_service.delete_pet(pet_id)
    if not success:
        raise HTTPException(status_code=404, detail="宠物不存在")
    return {"success": True, "message": "删除成功"}

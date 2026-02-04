"""
图片上传 API 路由
使用 Supabase Storage 存储
"""

from fastapi import APIRouter, HTTPException, UploadFile, File

from service import storage_service

router = APIRouter(prefix="/upload", tags=["文件上传"])

# 允许的图片类型
ALLOWED_TYPES = {"image/jpeg", "image/png", "image/gif", "image/webp"}
MAX_SIZE = 10 * 1024 * 1024  # 10MB


@router.post("/image")
async def upload_image(file: UploadFile = File(..., description="图片文件")):
    """
    上传图片到 Supabase Storage
    
    支持格式: JPEG, PNG, GIF, WebP
    最大大小: 10MB
    
    Returns:
        图片的公开访问 URL
    """
    # 检查文件类型
    if file.content_type not in ALLOWED_TYPES:
        raise HTTPException(
            status_code=400, 
            detail=f"不支持的文件类型: {file.content_type}，支持的类型: {', '.join(ALLOWED_TYPES)}"
        )
    
    # 读取文件内容
    content = await file.read()
    
    # 检查文件大小
    if len(content) > MAX_SIZE:
        raise HTTPException(
            status_code=400, 
            detail=f"文件太大，最大支持 {MAX_SIZE // 1024 // 1024}MB"
        )
    
    # 上传到 Supabase Storage
    url = storage_service.upload_image(
        file_content=content,
        filename=file.filename or "image.jpg",
        content_type=file.content_type
    )
    
    if not url:
        raise HTTPException(
            status_code=500, 
            detail="图片上传失败，请确保已在 Supabase 创建 pet-images 存储桶"
        )
    
    return {"success": True, "url": url}


@router.delete("/image")
async def delete_image(url: str):
    """删除图片"""
    success = storage_service.delete_image(url)
    if not success:
        raise HTTPException(status_code=500, detail="删除失败")
    return {"success": True, "message": "删除成功"}

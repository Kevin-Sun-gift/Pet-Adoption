"""
Supabase Storage 图片上传服务
使用 Supabase 自带的存储功能
"""

import uuid
from typing import Optional
from repository.supabase_client import supabase

# 存储桶名称（需要在 Supabase 控制台创建）
BUCKET_NAME = "pet-images"


def upload_image(file_content: bytes, filename: str, content_type: str = "image/jpeg") -> Optional[str]:
    """
    上传图片到 Supabase Storage
    
    Args:
        file_content: 图片二进制内容
        filename: 原始文件名
        content_type: MIME 类型
        
    Returns:
        图片的公开访问 URL，失败返回 None
    """
    try:
        # 生成唯一文件名
        ext = filename.split('.')[-1] if '.' in filename else 'jpg'
        unique_filename = f"pets/{uuid.uuid4()}.{ext}"
        
        # 上传到 Supabase Storage
        result = supabase.storage.from_(BUCKET_NAME).upload(
            path=unique_filename,
            file=file_content,
            file_options={"content-type": content_type}
        )
        
        # 获取公开 URL
        public_url = supabase.storage.from_(BUCKET_NAME).get_public_url(unique_filename)
        
        return public_url
            
    except Exception as e:
        print(f"Supabase Storage 上传失败: {e}")
        return None


def delete_image(image_url: str) -> bool:
    """
    删除图片
    
    Args:
        image_url: 图片的完整 URL
        
    Returns:
        是否删除成功
    """
    try:
        # 从 URL 提取文件路径
        # URL 格式: https://xxx.supabase.co/storage/v1/object/public/pet-images/pets/xxx.jpg
        if "/pet-images/" in image_url:
            file_path = image_url.split("/pet-images/")[-1]
            supabase.storage.from_(BUCKET_NAME).remove([file_path])
            return True
        return False
    except Exception as e:
        print(f"Supabase Storage 删除失败: {e}")
        return False

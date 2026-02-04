"""
Cloudflare R2 图片上传服务
使用 boto3 的 S3 兼容 API
"""

import os
import uuid
from typing import Optional
import boto3
from botocore.config import Config


class R2Service:
    """Cloudflare R2 存储服务"""
    
    def __init__(self):
        self.account_id = os.getenv("R2_ACCOUNT_ID")
        self.access_key_id = os.getenv("R2_ACCESS_KEY_ID")
        self.secret_access_key = os.getenv("R2_SECRET_ACCESS_KEY")
        self.bucket_name = os.getenv("R2_BUCKET_NAME", "pet-adoption-images")
        self.public_url = os.getenv("R2_PUBLIC_URL", "")
        
        # 检查配置
        if not all([self.account_id, self.access_key_id, self.secret_access_key]):
            print("警告: R2 配置不完整，图片上传功能将不可用")
            self.client = None
            return
        
        # 创建 S3 兼容客户端
        self.client = boto3.client(
            's3',
            endpoint_url=f"https://{self.account_id}.r2.cloudflarestorage.com",
            aws_access_key_id=self.access_key_id,
            aws_secret_access_key=self.secret_access_key,
            config=Config(
                signature_version='s3v4',
                s3={'addressing_style': 'path'}
            ),
            region_name='auto'
        )
    
    def upload_image(self, file_content: bytes, filename: str, content_type: str = "image/jpeg") -> Optional[str]:
        """
        上传图片到 R2
        
        Args:
            file_content: 图片二进制内容
            filename: 原始文件名
            content_type: MIME 类型
            
        Returns:
            图片的公开访问 URL，失败返回 None
        """
        if not self.client:
            return None
        
        try:
            # 生成唯一文件名
            ext = filename.split('.')[-1] if '.' in filename else 'jpg'
            unique_filename = f"pets/{uuid.uuid4()}.{ext}"
            
            # 上传到 R2
            self.client.put_object(
                Bucket=self.bucket_name,
                Key=unique_filename,
                Body=file_content,
                ContentType=content_type,
            )
            
            # 返回公开 URL
            if self.public_url:
                return f"{self.public_url}/{unique_filename}"
            else:
                return f"https://{self.bucket_name}.{self.account_id}.r2.cloudflarestorage.com/{unique_filename}"
                
        except Exception as e:
            print(f"R2 上传失败: {e}")
            return None
    
    def delete_image(self, image_url: str) -> bool:
        """删除图片"""
        if not self.client:
            return False
        
        try:
            # 从 URL 提取 key
            key = image_url.split('/')[-2] + '/' + image_url.split('/')[-1]
            self.client.delete_object(Bucket=self.bucket_name, Key=key)
            return True
        except Exception as e:
            print(f"R2 删除失败: {e}")
            return False


# 单例实例
r2_service = R2Service()

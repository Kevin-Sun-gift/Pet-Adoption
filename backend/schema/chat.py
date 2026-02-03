"""
聊天数据模型定义
"""

from typing import Optional
from pydantic import BaseModel, Field


class Message(BaseModel):
    """聊天消息"""
    role: str = Field(..., pattern="^(user|model|system)$", description="消息角色")
    text: str = Field(..., description="消息内容")
    time: Optional[str] = Field(None, description="消息时间")


class ChatRequest(BaseModel):
    """聊天请求"""
    pet_id: str = Field(..., description="宠物ID")
    messages: list[Message] = Field(..., description="聊天历史")


class ChatResponse(BaseModel):
    """聊天响应"""
    response: str = Field(..., description="AI 回复内容")

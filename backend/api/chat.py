"""
AI 聊天 API 路由
"""

from fastapi import APIRouter, HTTPException

from schema.chat import ChatRequest, ChatResponse
from service import pet_service, chat_service

router = APIRouter(prefix="/chat", tags=["AI聊天"])


@router.post("", response_model=ChatResponse)
async def chat(request: ChatRequest):
    """
    与 AI 助手对话
    需要提供宠物 ID 和聊天历史
    """
    # 获取宠物信息
    pet = pet_service.get_pet_by_id(request.pet_id)
    if not pet:
        raise HTTPException(status_code=404, detail="宠物不存在")
    
    # 转换消息格式
    messages = [msg.model_dump() for msg in request.messages]
    
    # 调用 AI 服务
    response_text = await chat_service.chat_with_assistant(pet, messages)
    
    return ChatResponse(response=response_text)

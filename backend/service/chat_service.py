"""
AI 聊天业务逻辑服务
使用 Google Gemini API 实现宠物咨询助手
"""

import os
import google.generativeai as genai
from dotenv import load_dotenv

load_dotenv()

# 配置 Gemini API
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY", "")
if GEMINI_API_KEY:
    genai.configure(api_key=GEMINI_API_KEY)


async def chat_with_assistant(pet: dict, messages: list[dict]) -> str:
    """
    与 AI 助手对话
    
    Args:
        pet: 宠物信息字典
        messages: 聊天历史列表
    
    Returns:
        AI 回复文本
    """
    # 检查 API Key 是否配置
    if not GEMINI_API_KEY:
        return "抱歉，AI 助手服务暂时不可用。请稍后再试或联系客服。"
    
    # 构建系统提示
    owner = pet.get("owner", {})
    health_info = ", ".join(pet.get("health", [])) or "暂无健康记录"
    
    system_instruction = f"""
你是一个宠物领养中心的助手。你正在帮助潜在领养人了解关于 {pet.get('name', '这只宠物')} 的信息。

{pet.get('name', '这只宠物')} 的基本信息：
- 品种: {pet.get('breed', '未知')}
- 距离: {pet.get('distance', '未知')}
- 年龄: {pet.get('age', '未知')}
- 性别: {'公' if pet.get('gender') == 'male' else '母'}
- 性格/描述: {pet.get('description', '暂无描述')}
- 健康状况: {health_info}

你的语气应该是热情、负责且专业的。如果用户问到如何领养，请告诉他们可以点击"申请领养"按钮。
请始终保持简洁，回答不要太长。
"""

    try:
        # 创建模型实例
        model = genai.GenerativeModel(
            model_name="gemini-1.5-flash",
            system_instruction=system_instruction
        )
        
        # 转换消息格式
        history = []
        for msg in messages[:-1]:  # 除了最后一条消息
            role = "user" if msg.get("role") == "user" else "model"
            history.append({"role": role, "parts": [msg.get("text", "")]})
        
        # 创建对话
        chat = model.start_chat(history=history)
        
        # 获取用户最后一条消息并发送
        last_message = messages[-1].get("text", "") if messages else ""
        response = chat.send_message(last_message)
        
        return response.text or "抱歉，我现在无法回答您的问题。"
        
    except Exception as e:
        print(f"Gemini API Error: {e}")
        return "连接助手时出了点问题，请稍后再试。"

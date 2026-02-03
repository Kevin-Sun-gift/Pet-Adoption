"""
Supabase 客户端配置
提供与 Supabase 数据库交互的统一客户端实例
"""

import os
from supabase import create_client, Client
from dotenv import load_dotenv

# 加载环境变量
load_dotenv()

# 获取 Supabase 配置
SUPABASE_URL = os.getenv("SUPABASE_URL", "")
SUPABASE_KEY = os.getenv("SUPABASE_KEY", "")

# 验证配置
if not SUPABASE_URL or not SUPABASE_KEY:
    raise ValueError("缺少 SUPABASE_URL 或 SUPABASE_KEY 环境变量配置")


def get_supabase_client() -> Client:
    """
    获取 Supabase 客户端实例
    使用单例模式确保整个应用共用同一个客户端
    """
    return create_client(SUPABASE_URL, SUPABASE_KEY)


# 创建全局客户端实例
supabase: Client = get_supabase_client()

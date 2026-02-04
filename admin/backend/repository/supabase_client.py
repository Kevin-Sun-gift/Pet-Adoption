"""
Supabase 客户端 - 复用主项目配置
"""

import os
from supabase import create_client, Client

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")

if not SUPABASE_URL or not SUPABASE_KEY:
    raise ValueError("请设置 SUPABASE_URL 和 SUPABASE_KEY 环境变量")

supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

"""
宠物领养平台 - FastAPI 后端主入口
"""

import os
from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv

# 加载环境变量
load_dotenv()

# 导入路由模块
from api import pets, favorites, applications, chat


@asynccontextmanager
async def lifespan(app: FastAPI):
    """
    应用生命周期管理
    启动时执行初始化，关闭时执行清理
    """
    print("🐾 宠物领养平台后端启动中...")
    yield
    print("👋 后端服务关闭")


# 创建 FastAPI 应用
app = FastAPI(
    title="宠物领养平台 API",
    description="提供宠物浏览、收藏、领养申请等功能的后端服务",
    version="1.0.0",
    lifespan=lifespan
)

# 配置 CORS - 允许 Vercel 和本地开发访问
# 从环境变量读取额外的允许源
cors_origins_env = os.getenv("CORS_ORIGINS", "")
cors_origins = [
    "http://localhost:5173",
    "http://localhost:3000",
    "http://127.0.0.1:5173",
    "http://127.0.0.1:3000",
]
# 添加环境变量中的额外源
if cors_origins_env:
    cors_origins.extend([origin.strip() for origin in cors_origins_env.split(",") if origin.strip()])

app.add_middleware(
    CORSMiddleware,
    allow_origins=cors_origins,
    allow_origin_regex=r"https://.*\.vercel\.app",  # 允许所有 Vercel 子域名
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 注册路由
app.include_router(pets.router, prefix="/api")
app.include_router(favorites.router, prefix="/api")
app.include_router(applications.router, prefix="/api")
app.include_router(chat.router, prefix="/api")


@app.get("/")
async def root():
    """
    健康检查端点
    """
    return {
        "message": "🐾 欢迎使用宠物领养平台 API",
        "status": "running",
        "docs": "/docs"
    }


@app.get("/api/health")
async def health_check():
    """
    API 健康状态检查
    """
    return {"status": "healthy"}


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)

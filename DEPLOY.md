# PetLove 宠物领养平台 - Vercel 部署指南

本指南帮助您将宠物领养 App（用户端）部署到 Vercel，实现前后端联通。

---

## 架构概述

```
┌─────────────────┐      ┌─────────────────┐      ┌─────────────────┐
│   Vercel        │      │   Render/       │      │   Supabase      │
│   (前端 React)   │ ───▶ │   Railway       │ ───▶ │   (数据库)       │
│                 │      │   (后端 FastAPI) │      │                 │
└─────────────────┘      └─────────────────┘      └─────────────────┘
```

- **前端**：部署到 Vercel
- **后端**：部署到 Render 或 Railway（Vercel 不原生支持 Python FastAPI）
- **数据库**：继续使用 Supabase

---

## Part 1: 部署后端到 Render

> Render 提供免费 Python 后端托管，简单易用。

### 步骤 1.1: 准备后端代码

在 `backend/` 目录下创建 `render.yaml`：

```yaml
# backend/render.yaml
services:
  - type: web
    name: petlove-api
    runtime: python
    buildCommand: pip install -r requirements.txt
    startCommand: uvicorn main:app --host 0.0.0.0 --port $PORT
    envVars:
      - key: SUPABASE_URL
        sync: false
      - key: SUPABASE_KEY
        sync: false
```

### 步骤 1.2: 创建 Render 服务

1. 访问 [Render](https://render.com) 并登录
2. 点击 **New +** → **Web Service**
3. 连接 GitHub 仓库 `Kevin-Sun-gift/Pet-Adoption`
4. 配置：
   - **Name**: `petlove-api`
   - **Root Directory**: `backend`
   - **Runtime**: Python 3
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `uvicorn main:app --host 0.0.0.0 --port $PORT`

### 步骤 1.3: 配置环境变量

在 Render 控制台添加环境变量：

| Key | Value |
|-----|-------|
| `SUPABASE_URL` | `https://jxaegpqklxuygwtcnzrb.supabase.co` |
| `SUPABASE_KEY` | `sb_publishable_IdNxdGE9QARWfKH6LdbR1Q_PL_fBwVR` |

### 步骤 1.4: 部署并获取 URL

部署完成后，记录后端 URL（格式如 `https://petlove-api.onrender.com`）。

---

## Part 2: 部署前端到 Vercel

### 步骤 2.1: 安装 Vercel CLI（可选）

```bash
npm i -g vercel
```

### 步骤 2.2: 通过 Vercel 控制台部署

1. 访问 [Vercel](https://vercel.com) 并登录
2. 点击 **Add New...** → **Project**
3. 导入 GitHub 仓库 `Kevin-Sun-gift/Pet-Adoption`
4. 配置：
   - **Framework Preset**: Vite
   - **Root Directory**: `.`（根目录）
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

### 步骤 2.3: 配置环境变量

> [!IMPORTANT]
> 这是前后端联通的关键步骤

在 Vercel 项目设置 → **Environment Variables** 中添加：

| Name | Value | Description |
|------|-------|-------------|
| `VITE_API_URL` | `https://petlove-api.onrender.com/api` | 后端 API 地址 |
| `GEMINI_API_KEY` | `你的 Gemini API Key` | AI 聊天功能（可选） |

### 步骤 2.4: 重新部署

添加环境变量后，点击 **Redeploy** 使配置生效。

---

## Part 3: 验证部署

### 检查后端 API

访问后端健康检查端点：
```
https://petlove-api.onrender.com/
```
应返回 `{"status": "ok", "message": "PetLove API 运行中"}`

### 检查前端

访问 Vercel 分配的域名（如 `https://pet-adoption-xxx.vercel.app`）：
- 首页应正常加载宠物列表
- 点击宠物可查看详情
- 收藏功能正常工作

---

## 常见问题

### Q: 前端无法连接后端？

检查 CORS 配置。在 `backend/main.py` 中，确保 allow_origins 包含 Vercel 域名：

```python
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "https://pet-adoption-xxx.vercel.app",  # 添加你的 Vercel 域名
        "https://*.vercel.app",  # 或使用通配符
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

### Q: Render 休眠导致首次加载慢？

免费版 Render 会在不活动时休眠，首次访问可能需要 30-60 秒唤醒。可以：
- 升级到付费版
- 使用定时任务 ping 保持活跃
- 考虑使用 Railway（免费版无休眠）

### Q: 环境变量不生效？

Vercel 环境变量需要以 `VITE_` 开头才能在前端代码中使用。确保使用 `VITE_API_URL` 而不是 `API_URL`。

---

## 环境变量汇总

### 后端（Render）

| 变量名 | 值 | 必需 |
|--------|------|------|
| `SUPABASE_URL` | Supabase 项目 URL | ✅ |
| `SUPABASE_KEY` | Supabase anon key | ✅ |

### 前端（Vercel）

| 变量名 | 值 | 必需 |
|--------|------|------|
| `VITE_API_URL` | 后端 API URL（含 /api） | ✅ |
| `GEMINI_API_KEY` | Gemini API Key | ❌ |

---

## 部署完成后

恭喜！您的宠物领养 App 现已上线。

- **前端**: `https://pet-adoption-xxx.vercel.app`
- **后端**: `https://petlove-api.onrender.com`
- **API 文档**: `https://petlove-api.onrender.com/docs`

# Supabase Storage 配置指南

使用 Supabase 自带的存储功能来存储宠物图片，比 R2 更简单！

---

## 第一步：进入 Supabase 控制台

1. 访问 [Supabase](https://supabase.com) 并登录
2. 选择您的项目（jxaegpqklxuygwtcnzrb）

---

## 第二步：创建存储桶

1. 点击左侧菜单 **Storage**（存储图标）
2. 点击 **New bucket**（新建存储桶）
3. 填写：
   - **Name**: `pet-images`（⚠️ 必须是这个名称）
   - **Public bucket**: ✅ 打开（允许公开访问）
4. 点击 **Create bucket**

---

## 第三步：设置存储策略（可选但推荐）

为了安全起见，设置上传权限：

1. 点击刚创建的 `pet-images` 存储桶
2. 点击 **Policies** 标签
3. 点击 **New policy**
4. 选择 **For full customization**
5. 填写：
   - **Policy name**: `Allow public read`
   - **Allowed operation**: `SELECT`（读取）
   - **Target roles**: `anon`
   - **Policy definition**: `true`
6. 点击 **Review** → **Save policy**

再添加一个上传策略：
1. 点击 **New policy**
2. **Policy name**: `Allow authenticated upload`
3. **Allowed operation**: `INSERT`（上传）
4. **Target roles**: `anon`
5. **Policy definition**: `true`
6. 点击 **Review** → **Save policy**

---

## 第四步：重启管理后台

```bash
# 在终端中按 Ctrl+C 停止后端，然后重新启动
cd admin/backend
source venv/bin/activate
uvicorn main:app --reload --port 8001
```

---

## 验证配置

1. 访问管理后台 http://localhost:3001
2. 进入「宠物管理」→「添加宠物」
3. 选择一张图片上传
4. 如果显示图片预览，配置成功！

---

## 优势

✅ 无需额外配置任何 API Key  
✅ 与数据库在同一个平台，管理方便  
✅ 免费额度：1GB 存储 + 2GB 传输/月  
✅ 自动 CDN 加速

# Cloudflare R2 配置指南

本指南帮助技术小白完成 Cloudflare R2 云存储配置，用于存储宠物图片。

---

## 第一步：注册 Cloudflare 账号

1. 访问 [Cloudflare 官网](https://www.cloudflare.com)
2. 点击右上角 **Sign Up**（注册）
3. 输入邮箱和密码，完成注册
4. 验证邮箱

---

## 第二步：进入 R2 控制台

1. 登录后，点击左侧菜单 **R2 Object Storage**
2. 如果是首次使用，需要添加信用卡（R2 有免费额度，不会自动扣费）
   - 每月 **10GB 免费存储**
   - 每月 **1000万次免费操作**

---

## 第三步：创建存储桶 (Bucket)

1. 点击 **Create bucket**（创建存储桶）
2. 填写信息：
   - **Bucket name**: `pet-adoption-images`（或其他名称）
   - **Location**: 选择离您最近的区域（如 Asia Pacific）
3. 点击 **Create bucket**

---

## 第四步：获取 Account ID

1. 点击左侧菜单最上方的 **Overview**
2. 在右侧面板找到 **Account ID**
3. 点击复制图标，记录下来

```
Account ID: xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

---

## 第五步：创建 API Token

1. 点击左侧菜单 **R2 Object Storage** → **Overview**
2. 点击右侧 **Manage R2 API Tokens**
3. 点击 **Create API token**
4. 填写：
   - **Token name**: `pet-adoption-upload`
   - **Permissions**: 选择 **Object Read & Write**
   - **Specify bucket(s)**: 选择您创建的存储桶
5. 点击 **Create API Token**
6. ⚠️ **重要**: 复制并保存显示的两个值（只显示一次！）

```
Access Key ID: xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
Secret Access Key: xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

---

## 第六步：配置公开访问（可选但推荐）

要让图片可以被公开访问：

1. 进入您创建的存储桶
2. 点击 **Settings** 标签
3. 找到 **Public access** 部分
4. 点击 **Allow Access**
5. 系统会分配一个公开 URL，格式如：
   ```
   https://pub-xxxxxxxxxxxxxxxxxxxxxx.r2.dev
   ```

---

## 第七步：填写配置到 .env 文件

编辑 `admin/backend/.env` 文件：

```env
# Supabase 配置
SUPABASE_URL=https://jxaegpqklxuygwtcnzrb.supabase.co
SUPABASE_KEY=sb_publishable_IdNxdGE9QARWfKH6LdbR1Q_PL_fBwVR

# Cloudflare R2 配置
R2_ACCOUNT_ID=你的Account_ID（第四步获取）
R2_ACCESS_KEY_ID=你的Access_Key_ID（第五步获取）
R2_SECRET_ACCESS_KEY=你的Secret_Access_Key（第五步获取）
R2_BUCKET_NAME=pet-adoption-images（第三步创建的桶名）
R2_PUBLIC_URL=你的公开URL（第六步获取，如 https://pub-xxx.r2.dev）
```

---

## 第八步：重启管理后台

配置完成后，重启后端服务：

```bash
# 在 admin/backend 目录下
Ctrl+C  # 停止当前服务
source venv/bin/activate
uvicorn main:app --reload --port 8001
```

---

## 验证配置是否成功

1. 访问管理后台 http://localhost:3001
2. 进入「宠物管理」
3. 点击「添加宠物」
4. 尝试上传一张图片
5. 如果显示图片预览，说明配置成功！

---

## 常见问题

### Q: 提示"请检查 R2 配置"？
A: 请确认：
- Account ID 是否正确（32位字符）
- Access Key ID 和 Secret Access Key 是否复制完整
- 没有多余的空格

### Q: 图片上传成功但无法显示？
A: 检查第六步的公开访问是否开启，R2_PUBLIC_URL 是否填写正确。

### Q: 需要付费吗？
A: R2 提供慷慨的免费额度，普通使用完全免费。只有超出免费额度才需要付费。

---

## 配置值示例

```env
R2_ACCOUNT_ID=a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6
R2_ACCESS_KEY_ID=x1y2z3a4b5c6d7e8f9g0h1i2j3k4l5m6
R2_SECRET_ACCESS_KEY=abcdefghijklmnopqrstuvwxyz123456789abcdefgh
R2_BUCKET_NAME=pet-adoption-images
R2_PUBLIC_URL=https://pub-abc123def456.r2.dev
```

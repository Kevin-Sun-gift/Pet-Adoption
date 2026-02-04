-- 管理后台数据库扩展迁移脚本
-- 为现有表添加新字段，创建通知表

-- 1. 为 pets 表添加 is_adopted 字段（标记已被领养）
ALTER TABLE pets ADD COLUMN IF NOT EXISTS is_adopted BOOLEAN DEFAULT FALSE;

-- 2. 创建通知表
CREATE TABLE IF NOT EXISTS notifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_phone VARCHAR(20) NOT NULL,          -- 用户手机号（作为用户标识）
    pet_id UUID REFERENCES pets(id) ON DELETE SET NULL,
    application_id UUID REFERENCES applications(id) ON DELETE CASCADE,
    title VARCHAR(200) NOT NULL,
    content TEXT NOT NULL,
    type VARCHAR(50) DEFAULT 'adoption_approved' CHECK (type IN ('adoption_approved', 'adoption_rejected', 'system')),
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. 创建索引
CREATE INDEX IF NOT EXISTS idx_notifications_user_phone ON notifications(user_phone);
CREATE INDEX IF NOT EXISTS idx_notifications_is_read ON notifications(is_read);
CREATE INDEX IF NOT EXISTS idx_pets_is_adopted ON pets(is_adopted);

-- 4. 为 applications 表添加审批相关字段
ALTER TABLE applications ADD COLUMN IF NOT EXISTS reviewed_at TIMESTAMP WITH TIME ZONE;
ALTER TABLE applications ADD COLUMN IF NOT EXISTS review_note TEXT;

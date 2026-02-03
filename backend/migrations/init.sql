-- Supabase 数据库初始化脚本
-- 宠物领养平台

-- 启用 UUID 扩展
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 宠物表
CREATE TABLE IF NOT EXISTS pets (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL,
    breed VARCHAR(100) NOT NULL,
    type VARCHAR(20) NOT NULL CHECK (type IN ('dog', 'cat', 'rabbit', 'other')),
    gender VARCHAR(10) NOT NULL CHECK (gender IN ('male', 'female')),
    age VARCHAR(50) NOT NULL,
    weight VARCHAR(50),
    distance VARCHAR(50) NOT NULL,
    price INTEGER NOT NULL DEFAULT 0,
    description TEXT,
    image VARCHAR(500) NOT NULL,
    location VARCHAR(200) NOT NULL,
    owner JSONB NOT NULL DEFAULT '{}',
    health TEXT[] DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 故事表
CREATE TABLE IF NOT EXISTS stories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(100) NOT NULL,
    image VARCHAR(500) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 收藏表
CREATE TABLE IF NOT EXISTS favorites (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id VARCHAR(100) NOT NULL,
    pet_id UUID NOT NULL REFERENCES pets(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id, pet_id)
);

-- 领养申请表
CREATE TABLE IF NOT EXISTS applications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    pet_id UUID NOT NULL REFERENCES pets(id) ON DELETE CASCADE,
    applicant_name VARCHAR(100) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    occupation VARCHAR(100),
    reason TEXT,
    has_pets BOOLEAN DEFAULT FALSE,
    family_agreed BOOLEAN DEFAULT FALSE,
    accept_followup BOOLEAN DEFAULT FALSE,
    environment_photos TEXT[] DEFAULT '{}',
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 创建索引以提高查询性能
CREATE INDEX IF NOT EXISTS idx_pets_type ON pets(type);
CREATE INDEX IF NOT EXISTS idx_favorites_user_id ON favorites(user_id);
CREATE INDEX IF NOT EXISTS idx_favorites_pet_id ON favorites(pet_id);
CREATE INDEX IF NOT EXISTS idx_applications_pet_id ON applications(pet_id);
CREATE INDEX IF NOT EXISTS idx_applications_status ON applications(status);

-- 插入初始宠物数据
INSERT INTO pets (id, name, breed, type, gender, age, weight, distance, price, location, description, image, owner, health) VALUES
(
    'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
    'Barney',
    '金毛混血 (Golden Retriever Mix)',
    'dog',
    'male',
    '2岁',
    '28公斤',
    '2.5km',
    150,
    'San Francisco, CA',
    'Barney 性格温顺，是个喜欢网球和海滩漫步的大个子。他对孩子特别友善，也能和其他狗狗融洽相处。他已养成良好的卫生习惯，懂"坐下"、"待在原地"等基本指令。目前正在寻找一个充满爱意的永久家园，最喜欢被人摸肚皮。',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuDD_8HU1UsNC_S7nz55Fr6Ye9umTczhQ5_v0K1eo52EnIIlUzPgdbt-CpPn2Hf3_jPVH91Yn5y63qdUmp02dZicFS5HTS1Bg-1-ERRSBT2kjb_NDEWj6LwfplGAhztaCMqLjOB9Y98a17NHm3Pb-delEi9ID_JCgBMoV44-pQPlHMWyDI2BgC4VFyXhm53Ck6yDwei9M_4kOzvdKnVWLsCaEWSQ5QS8znov7seL_MPmAqIKCu3Y0Hd5cqm5N2NG4psVFbiIE8akq48',
    '{"name": "Sarah Jenkins", "role": "送养人", "avatar": "https://lh3.googleusercontent.com/aida-public/AB6AXuA_ZfdEivjIUa8dn3xkluuBg4oFBN2N5NdeuTBl-I8X6_C-cnydhHpGc3In31zD89Ty8RbUANwsqS5w6ZvbeQa2BAYyyMkdSXJTPWwE4iQEr8c-t2Yl2whAf7I6NpcMrUGsxcO0rRNb-UCBrLmrwO6E9TPtTvXwZgfASq578Vqj-93JHZnUnS34E-P-DEHnQnnhBgbfohEm38a7s7X8Ohye0D9Pe75R9QNPOInZhFUrbhBbKxQhhrLqlOR-EbfYSYF1NVI9fMZcC9I"}',
    ARRAY['已接种疫苗', '已绝育', '已植入芯片', '已驱虫']
),
(
    'b2c3d4e5-f6a7-8901-bcde-f23456789012',
    'Baxter',
    '金毛寻回犬',
    'dog',
    'male',
    '2岁',
    NULL,
    '1.2 英里',
    120,
    '旧金山, 加州',
    '一个充满活力的小伙子。',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuBxCFjvL2px8J3FlME2zYsel7qDl6zND3g9dhKE-oUrssmA3Z2mj0kWxsgS9IHiQPYfM1Ph_ICzl2IT8EQrEqhoCeRsi5XQxgPnV7El4F8FyY0ffZ4mO0IoJnGh6Nsf8vSX0uxCvTxSseHW3hFD1PE5TPYwdAkfcf8QzgcaqRip4h3XImOOEYIvUfLqjglwq348Rmjhd19EG3h1zroVhOUVVnZv5itHClciyzw1T6Z3oxiM2n15HrEKvhQ_WnKkGNlOqXFkzfyp73Y',
    '{"name": "Sarah", "role": "Staff", "avatar": ""}',
    ARRAY[]::TEXT[]
),
(
    'c3d4e5f6-a7b8-9012-cdef-345678901234',
    'Luna',
    '短毛猫',
    'cat',
    'female',
    '4个月',
    NULL,
    '3.0 英里',
    80,
    '旧金山, 加州',
    '好奇心旺盛的小猫。',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuC9axqwRmJPgOsTUHvsUzUC_UxoREGQNNFOfPL80gU_Y444WLRjGgtZX2RemYxud6mDB5_VvyjkPkl2o3DkvDWsRV2Wx4Go2oN_2mNS9_johnOPHS701SZ59ayIkZdPyaDGEEw9QMVxNJy-gJUnC5eSjAqMCTgjMR5jVUJY8ml_fW0U7qpmPM0e_R1Ro7jHeyQI4w4FSPyt_08YBU1RO9QBoNWULc_egHIUaVwwG86iRtd8mY1Fez-1KhZ5TfeWKDm70T3Py6Qrxqc',
    '{"name": "Sarah", "role": "Staff", "avatar": ""}',
    ARRAY[]::TEXT[]
),
(
    'd4e5f6a7-b8c9-0123-defa-456789012345',
    'Thumper',
    '荷兰垂耳兔',
    'rabbit',
    'male',
    '1岁',
    NULL,
    '5.1 英里',
    50,
    '旧金山, 加州',
    '文静的兔子。',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuDfmGv_jx4xuDEReXtWP_oa0eIcB1cZRnj3i_bn4KV67oaie-ohTifXRGfapaZeH-BSDtH4b7LAKXxtfo2Snh5xxFKLDzGxZMn0FWA6Zle8qvqD7449KieR6Oflw77x17YKMAoJ-kfk-9t0q5pNcP9X9DAonktccndM-jXaufJRuciE_sDcBFNUMiLqw52-VmrkGf1k3IprhRcBt3Ir1MJFiCi1yWVacQEfV59aHy12tGcy9ON0e7Ee9V7vM81em7JBUoS8ovh9yTM',
    '{"name": "Sarah", "role": "Staff", "avatar": ""}',
    ARRAY[]::TEXT[]
);

-- 插入故事数据
INSERT INTO stories (id, title, image) VALUES
('11111111-1111-1111-1111-111111111111', '救援', 'https://lh3.googleusercontent.com/aida-public/AB6AXuB1INzlfKKQh0urMWtFvabzjd-GrmuDLd9RK_kFRrD4_tV5Qn_el8DlsxN6-wBNBuYyQOv3KP85-_s9eGueZJhlujWBEcln8oCN7_gprvSO_ZNxowRrS3WvSkyPlXtGb0PrCAfgnrJYaaT14CidJ5HZXUyc-q9XCKFsqkOjuu5pn-YjYIZSkftjx9CBHhXJVIA3cRSiAMbXJ5xmNLF815Bq6_j8wKVrfH0C7-x_edHuKJBWaW-gzE19GAW3fe1br0zMs0OhBrxUO28'),
('22222222-2222-2222-2222-222222222222', '知识', 'https://lh3.googleusercontent.com/aida-public/AB6AXuAO6qqNb__8I9LanThsjNzUyQHdYtiiHwItG2XE5AB3y_iD0Tbd_XI0920LZZxSmn2kQzwrX2syekoUn-uyGQKMFc3g8ECMO-zQ_6WNtaqk1TPKifcx5mRXIKJygwld-Ktf1-UZBvla7Tf8yUL79Na_3t-rXhOhljmVjijglFXNAAtI9RYNqUtTySiRdOwDbwtBR4PxMzMcdr3ch4v2Y8-OOonKh3iSV61WqAsfHrdKhrTsAU3cAzRDlmXePGmDkcD5o9rsB9Onfa0'),
('33333333-3333-3333-3333-333333333333', '活动', 'https://lh3.googleusercontent.com/aida-public/AB6AXuCpKwctCynscYK6s80_RwRbjMieeTu8fixh2OiOzGPE4dF4OmZ1DVGN6dzKZgHhC-Gf_RJnuaYU6vfaRFI-PoAs339uLGY6ZZ0ZjFkDmYjAJV_SGdrw0hk6BIQN0x8qtLxgXhqWufbGx336iHH0vt5qMOxq-cvGv51pZWKuKU5uTyXP8AIZdyUyWL-RIG_CpijGO2jyQ8M2JDihLQtzwAlvMjOo8zg3RNedOJgQwac2zeVhaHFh5uJiyJU1vAKwgII1SNfyu_vcIC0'),
('44444444-4444-4444-4444-444444444444', '社区', 'https://lh3.googleusercontent.com/aida-public/AB6AXuDU1ksfTOPe_R9_ZeRXUonaXyRLFJg_Bv54NHTupayZoydAnKmQ1BPBgwCqblsZYHSX1Z3FnNh7FQe_LY1WVux81Cy0ukTfc1YMa0894lc-pZoDiFeg-qsEB62ce0PtL4TriyIWJMId7LxdtXmfJ5i3hAvvA1jJvOCGDluOozSKoOqsF_eu7xOb06A8qjxIAVqYvIPVo578jbeWWJDQGLqg5N7cJw_EytUijJ5_Fr92sY5Bfs9Z3LohYymxpq9CVgHyW-AKCTOArXw'),
('55555555-5555-5555-5555-555555555555', '医疗', 'https://lh3.googleusercontent.com/aida-public/AB6AXuAFqKVN9arvqhfAcXEd4zKtTZhhriZs9cY-U53g4FCZLaJ_x648YYZnm-K_wFnisL8dqWAzfi83VOuK_b63pxkC6YmA8KTKFvV2oAjEGIeet5XKBf7aDdmtGUzLFoAKHgwxERR54KHh48hvaeam7wIsL_l3RJGGxeEHejO-_hDkYGZB_IiqaCUfQkWdIQnYf4IMJJyP9EEhBdQKJa1xp8onVpyP877kWYcG75lgQWJSq09YStK3TARz-OvJ2De-ZaEf9SuarF1zrkA');

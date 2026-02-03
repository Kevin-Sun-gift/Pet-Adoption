
import { Pet, Story } from './types';

export const PETS: Pet[] = [
  {
    id: 'barney',
    name: 'Barney',
    breed: '金毛混血 (Golden Retriever Mix)',
    type: 'dog',
    gender: 'male',
    age: '2岁',
    weight: '28公斤',
    distance: '2.5km',
    price: 150,
    location: 'San Francisco, CA',
    description: 'Barney 性格温顺，是个喜欢网球和海滩漫步的大个子。他对孩子特别友善，也能和其他狗狗融洽相处。他已养成良好的卫生习惯，懂“坐下”、“待在原地”等基本指令。目前正在寻找一个充满爱意的永久家园，最喜欢被人摸肚皮。',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDD_8HU1UsNC_S7nz55Fr6Ye9umTczhQ5_v0K1eo52EnIIlUzPgdbt-CpPn2Hf3_jPVH91Yn5y63qdUmp02dZicFS5HTS1Bg-1-ERRSBT2kjb_NDEWj6LwfplGAhztaCMqLjOB9Y98a17NHm3Pb-delEi9ID_JCgBMoV44-pQPlHMWyDI2BgC4VFyXhm53Ck6yDwei9M_4kOzvdKnVWLsCaEWSQ5QS8znov7seL_MPmAqIKCu3Y0Hd5cqm5N2NG4psVFbiIE8akq48',
    owner: {
      name: 'Sarah Jenkins',
      role: '送养人',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA_ZfdEivjIUa8dn3xkluuBg4oFBN2N5NdeuTBl-I8X6_C-cnydhHpGc3In31zD89Ty8RbUANwsqS5w6ZvbeQa2BAYyyMkdSXJTPWwE4iQEr8c-t2Yl2whAf7I6NpcMrUGsxcO0rRNb-UCBrLmrwO6E9TPtTvXwZgfASq578Vqj-93JHZnUnS34E-P-DEHnQnnhBgbfohEm38a7s7X8Ohye0D9Pe75R9QNPOInZhFUrbhBbKxQhhrLqlOR-EbfYSYF1NVI9fMZcC9I'
    },
    health: ['已接种疫苗', '已绝育', '已植入芯片', '已驱虫']
  },
  {
    id: 'baxter',
    name: 'Baxter',
    breed: '金毛寻回犬',
    type: 'dog',
    gender: 'male',
    age: '2岁',
    distance: '1.2 英里',
    price: 120,
    location: '旧金山, 加州',
    description: '一个充满活力的小伙子。',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBxCFjvL2px8J3FlME2zYsel7qDl6zND3g9dhKE-oUrssmA3Z2mj0kWxsgS9IHiQPYfM1Ph_ICzl2IT8EQrEqhoCeRsi5XQxgPnV7El4F8FyY0ffZ4mO0IoJnGh6Nsf8vSX0uxCvTxSseHW3hFD1PE5TPYwdAkfcf8QzgcaqRip4h3XImOOEYIvUfLqjglwq348Rmjhd19EG3h1zroVhOUVVnZv5itHClciyzw1T6Z3oxiM2n15HrEKvhQ_WnKkGNlOqXFkzfyp73Y',
    owner: { name: 'Sarah', role: 'Staff', avatar: '' },
    health: []
  },
  {
    id: 'luna',
    name: 'Luna',
    breed: '短毛猫',
    type: 'cat',
    gender: 'female',
    age: '4个月',
    distance: '3.0 英里',
    price: 80,
    location: '旧金山, 加州',
    description: '好奇心旺盛的小猫。',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC9axqwRmJPgOsTUHvsUzUC_UxoREGQNNFOfPL80gU_Y444WLRjGgtZX2RemYxud6mDB5_VvyjkPkl2o3DkvDWsRV2Wx4Go2oN_2mNS9_johnOPHS701SZ59ayIkZdPyaDGEEw9QMVxNJy-gJUnC5eSjAqMCTgjMR5jVUJY8ml_fW0U7qpmPM0e_R1Ro7jHeyQI4w4FSPyt_08YBU1RO9QBoNWULc_egHIUaVwwG86iRtd8mY1Fez-1KhZ5TfeWKDm70T3Py6Qrxqc',
    owner: { name: 'Sarah', role: 'Staff', avatar: '' },
    health: []
  },
  {
    id: 'thumper',
    name: 'Thumper',
    breed: '荷兰垂耳兔',
    type: 'rabbit',
    gender: 'male',
    age: '1岁',
    distance: '5.1 英里',
    price: 50,
    location: '旧金山, 加州',
    description: '文静的兔子。',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDfmGv_jx4xuDEReXtWP_oa0eIcB1cZRnj3i_bn4KV67oaie-ohTifXRGfapaZeH-BSDtH4b7LAKXxtfo2Snh5xxFKLDzGxZMn0FWA6Zle8qvqD7449KieR6Oflw77x17YKMAoJ-kfk-9t0q5pNcP9X9DAonktccndM-jXaufJRuciE_sDcBFNUMiLqw52-VmrkGf1k3IprhRcBt3Ir1MJFiCi1yWVacQEfV59aHy12tGcy9ON0e7Ee9V7vM81em7JBUoS8ovh9yTM',
    owner: { name: 'Sarah', role: 'Staff', avatar: '' },
    health: []
  }
];

export const STORIES: Story[] = [
  { id: '1', title: '救援', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB1INzlfKKQh0urMWtFvabzjd-GrmuDLd9RK_kFRrD4_tV5Qn_el8DlsxN6-wBNBuYyQOv3KP85-_s9eGueZJhlujWBEcln8oCN7_gprvSO_ZNxowRrS3WvSkyPlXtGb0PrCAfgnrJYaaT14CidJ5HZXUyc-q9XCKFsqkOjuu5pn-YjYIZSkftjx9CBHhXJVIA3cRSiAMbXJ5xmNLF815Bq6_j8wKVrfH0C7-x_edHuKJBWaW-gzE19GAW3fe1br0zMs0OhBrxUO28' },
  { id: '2', title: '知识', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAO6qqNb__8I9LanThsjNzUyQHdYtiiHwItG2XE5AB3y_iD0Tbd_XI0920LZZxSmn2kQzwrX2syekoUn-uyGQKMFc3g8ECMO-zQ_6WNtaqk1TPKifcx5mRXIKJygwld-Ktf1-UZBvla7Tf8yUL79Na_3t-rXhOhljmVjijglFXNAAtI9RYNqUtTySiRdOwDbwtBR4PxMzMcdr3ch4v2Y8-OOonKh3iSV61WqAsfHrdKhrTsAU3cAzRDlmXePGmDkcD5o9rsB9Onfa0' },
  { id: '3', title: '活动', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCpKwctCynscYK6s80_RwRbjMieeTu8fixh2OiOzGPE4dF4OmZ1DVGN6dzKZgHhC-Gf_RJnuaYU6vfaRFI-PoAs339uLGY6ZZ0ZjFkDmYjAJV_SGdrw0hk6BIQN0x8qtLxgXhqWufbGx336iHH0vt5qMOxq-cvGv51pZWKuKU5uTyXP8AIZdyUyWL-RIG_CpijGO2jyQ8M2JDihLQtzwAlvMjOo8zg3RNedOJgQwac2zeVhaHFh5uJiyJU1vAKwgII1SNfyu_vcIC0' },
  { id: '4', title: '社区', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDU1ksfTOPe_R9_ZeRXUonaXyRLFJg_Bv54NHTupayZoydAnKmQ1BPBgwCqblsZYHSX1Z3FnNh7FQe_LY1WVux81Cy0ukTfc1YMa0894lc-pZoDiFeg-qsEB62ce0PtL4TriyIWJMId7LxdtXmfJ5i3hAvvA1jJvOCGDluOozSKoOqsF_eu7xOb06A8qjxIAVqYvIPVo578jbeWWJDQGLqg5N7cJw_EytUijJ5_Fr92sY5Bfs9Z3LohYymxpq9CVgHyW-AKCTOArXw' },
  { id: '5', title: '医疗', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAFqKVN9arvqhfAcXEd4zKtTZhhriZs9cY-U53g4FCZLaJ_x648YYZnm-K_wFnisL8dqWAzfi83VOuK_b63pxkC6YmA8KTKFvV2oAjEGIeet5XKBf7aDdmtGUzLFoAKHgwxERR54KHh48hvaeam7wIsL_l3RJGGxeEHejO-_hDkYGZB_IiqaCUfQkWdIQnYf4IMJJyP9EEhBdQKJa1xp8onVpyP877kWYcG75lgQWJSq09YStK3TARz-OvJ2De-ZaEf9SuarF1zrkA' }
];

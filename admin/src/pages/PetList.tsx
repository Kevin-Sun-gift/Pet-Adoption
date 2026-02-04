/**
 * 宠物管理页面
 */

import React, { useState, useEffect } from 'react';
import { get, post, put, del, uploadFile } from '../api/client';
import Header from '../components/Header';

interface Pet {
    id: string;
    name: string;
    breed: string;
    type: string;
    gender: string;
    age: string;
    weight?: string;
    distance: string;
    price: number;
    location: string;
    description?: string;
    image: string;
    is_adopted?: boolean;
    health: string[];
}

const PetList: React.FC = () => {
    const [pets, setPets] = useState<Pet[]>([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editingPet, setEditingPet] = useState<Pet | null>(null);
    const [uploading, setUploading] = useState(false);

    // 表单状态
    const [formData, setFormData] = useState({
        name: '',
        breed: '',
        type: 'dog',
        gender: 'male',
        age: '',
        weight: '',
        distance: '',
        price: 0,
        location: '',
        description: '',
        image: '',
        health: [] as string[],
    });

    const loadPets = async () => {
        try {
            const result = await get<{ data: Pet[] }>('/pets');
            setPets(result.data);
        } catch (error) {
            console.error('加载失败:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadPets();
    }, []);

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploading(true);
        try {
            const result = await uploadFile(file);
            setFormData(prev => ({ ...prev, image: result.url }));
        } catch (error) {
            alert('图片上传失败，请重试');
        } finally {
            setUploading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            if (editingPet) {
                await put(`/pets/${editingPet.id}`, formData);
            } else {
                await post('/pets', formData);
            }
            setShowForm(false);
            setEditingPet(null);
            resetForm();
            loadPets();
        } catch (error) {
            alert('保存失败');
        }
    };

    const handleEdit = (pet: Pet) => {
        setEditingPet(pet);
        setFormData({
            name: pet.name,
            breed: pet.breed,
            type: pet.type,
            gender: pet.gender,
            age: pet.age,
            weight: pet.weight || '',
            distance: pet.distance,
            price: pet.price,
            location: pet.location,
            description: pet.description || '',
            image: pet.image,
            health: pet.health || [],
        });
        setShowForm(true);
    };

    const handleDelete = async (id: string) => {
        if (!confirm('确定要删除此宠物吗？')) return;

        try {
            await del(`/pets/${id}`);
            loadPets();
        } catch (error) {
            alert('删除失败');
        }
    };

    const resetForm = () => {
        setFormData({
            name: '',
            breed: '',
            type: 'dog',
            gender: 'male',
            age: '',
            weight: '',
            distance: '',
            price: 0,
            location: '',
            description: '',
            image: '',
            health: [],
        });
    };

    const healthOptions = ['已接种疫苗', '已绝育', '已植入芯片', '已驱虫'];

    if (loading) {
        return (
            <div className="flex-1 flex items-center justify-center">
                <div className="text-gray-400">加载中...</div>
            </div>
        );
    }

    return (
        <div className="flex-1 flex flex-col bg-gray-50">
            <Header
                title="宠物管理"
                subtitle={`共 ${pets.length} 只宠物`}
                actions={
                    <button
                        onClick={() => { setShowForm(true); setEditingPet(null); resetForm(); }}
                        className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-xl font-medium hover:bg-primary-dark transition-colors"
                    >
                        <span className="material-symbols-outlined text-xl">add</span>
                        添加宠物
                    </button>
                }
            />

            <main className="flex-1 p-8 overflow-auto">
                {/* 宠物列表 */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {pets.map(pet => (
                        <div key={pet.id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                            <div className="relative aspect-square">
                                <img src={pet.image} alt={pet.name} className="w-full h-full object-cover" />
                                {pet.is_adopted && (
                                    <div className="absolute top-3 left-3 px-2 py-1 bg-teal-accent text-white text-xs font-bold rounded-full">
                                        已领养
                                    </div>
                                )}
                            </div>
                            <div className="p-4">
                                <div className="flex items-center justify-between mb-2">
                                    <h3 className="font-bold text-gray-900">{pet.name}</h3>
                                    <span className={`text-xs px-2 py-0.5 rounded-full ${pet.gender === 'male' ? 'bg-blue-100 text-blue-600' : 'bg-pink-100 text-pink-600'
                                        }`}>
                                        {pet.gender === 'male' ? '♂' : '♀'}
                                    </span>
                                </div>
                                <p className="text-sm text-gray-500 mb-1">{pet.breed}</p>
                                <p className="text-xs text-gray-400">{pet.age} · {pet.location}</p>
                                <div className="flex gap-2 mt-4">
                                    <button
                                        onClick={() => handleEdit(pet)}
                                        className="flex-1 py-2 text-sm text-primary border border-primary rounded-lg hover:bg-primary/5"
                                    >
                                        编辑
                                    </button>
                                    <button
                                        onClick={() => handleDelete(pet.id)}
                                        className="flex-1 py-2 text-sm text-red-500 border border-red-200 rounded-lg hover:bg-red-50"
                                    >
                                        删除
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </main>

            {/* 新增/编辑表单弹窗 */}
            {showForm && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-auto">
                        <div className="sticky top-0 bg-white border-b border-gray-100 p-6 flex items-center justify-between">
                            <h3 className="text-xl font-bold">{editingPet ? '编辑宠物' : '添加宠物'}</h3>
                            <button onClick={() => setShowForm(false)} className="text-gray-400 hover:text-gray-600">
                                <span className="material-symbols-outlined">close</span>
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="p-6 space-y-6">
                            {/* 图片上传 */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">宠物照片</label>
                                <div className="flex items-center gap-4">
                                    {formData.image ? (
                                        <img src={formData.image} className="w-24 h-24 object-cover rounded-xl" />
                                    ) : (
                                        <div className="w-24 h-24 bg-gray-100 rounded-xl flex items-center justify-center">
                                            <span className="material-symbols-outlined text-gray-400">image</span>
                                        </div>
                                    )}
                                    <label className="cursor-pointer">
                                        <span className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium transition-colors">
                                            {uploading ? '上传中...' : '选择图片'}
                                        </span>
                                        <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" disabled={uploading} />
                                    </label>
                                </div>
                            </div>

                            {/* 基本信息 */}
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">名称 *</label>
                                    <input
                                        type="text"
                                        value={formData.name}
                                        onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                                        className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">品种 *</label>
                                    <input
                                        type="text"
                                        value={formData.breed}
                                        onChange={(e) => setFormData(prev => ({ ...prev, breed: e.target.value }))}
                                        className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">类型 *</label>
                                    <select
                                        value={formData.type}
                                        onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value }))}
                                        className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent"
                                    >
                                        <option value="dog">狗狗</option>
                                        <option value="cat">猫咪</option>
                                        <option value="rabbit">兔子</option>
                                        <option value="other">其他</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">性别 *</label>
                                    <select
                                        value={formData.gender}
                                        onChange={(e) => setFormData(prev => ({ ...prev, gender: e.target.value }))}
                                        className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent"
                                    >
                                        <option value="male">公</option>
                                        <option value="female">母</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">年龄 *</label>
                                    <input
                                        type="text"
                                        value={formData.age}
                                        onChange={(e) => setFormData(prev => ({ ...prev, age: e.target.value }))}
                                        placeholder="如：2岁"
                                        className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">体重</label>
                                    <input
                                        type="text"
                                        value={formData.weight}
                                        onChange={(e) => setFormData(prev => ({ ...prev, weight: e.target.value }))}
                                        placeholder="如：5公斤"
                                        className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">距离 *</label>
                                    <input
                                        type="text"
                                        value={formData.distance}
                                        onChange={(e) => setFormData(prev => ({ ...prev, distance: e.target.value }))}
                                        placeholder="如：2.5km"
                                        className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">领养费用</label>
                                    <input
                                        type="number"
                                        value={formData.price}
                                        onChange={(e) => setFormData(prev => ({ ...prev, price: parseInt(e.target.value) || 0 }))}
                                        className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">位置 *</label>
                                <input
                                    type="text"
                                    value={formData.location}
                                    onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                                    placeholder="如：旧金山, 加州"
                                    className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">描述</label>
                                <textarea
                                    value={formData.description}
                                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                                    rows={3}
                                    className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                                />
                            </div>

                            {/* 健康状态 */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">健康状态</label>
                                <div className="flex flex-wrap gap-2">
                                    {healthOptions.map(option => (
                                        <label key={option} className="flex items-center gap-2 cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={formData.health.includes(option)}
                                                onChange={(e) => {
                                                    if (e.target.checked) {
                                                        setFormData(prev => ({ ...prev, health: [...prev.health, option] }));
                                                    } else {
                                                        setFormData(prev => ({ ...prev, health: prev.health.filter(h => h !== option) }));
                                                    }
                                                }}
                                                className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                                            />
                                            <span className="text-sm text-gray-600">{option}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            <div className="flex gap-4 pt-4">
                                <button
                                    type="button"
                                    onClick={() => setShowForm(false)}
                                    className="flex-1 py-3 border border-gray-200 rounded-xl font-medium hover:bg-gray-50"
                                >
                                    取消
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 py-3 bg-primary text-white rounded-xl font-medium hover:bg-primary-dark"
                                >
                                    保存
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PetList;

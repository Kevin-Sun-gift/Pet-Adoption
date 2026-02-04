/**
 * 领养审批页面
 */

import React, { useState, useEffect } from 'react';
import { get, post } from '../api/client';
import Header from '../components/Header';

interface Application {
    id: string;
    pet_id: string;
    applicant_name: string;
    phone: string;
    occupation?: string;
    reason?: string;
    has_pets: boolean;
    family_agreed: boolean;
    accept_followup: boolean;
    environment_photos: string[];
    status: 'pending' | 'approved' | 'rejected';
    created_at: string;
    reviewed_at?: string;
    review_note?: string;
    pets?: {
        id: string;
        name: string;
        image: string;
        breed: string;
    };
}

const statusMap = {
    pending: { label: '待审批', color: 'bg-yellow-100 text-yellow-700' },
    approved: { label: '已通过', color: 'bg-green-100 text-green-700' },
    rejected: { label: '已拒绝', color: 'bg-red-100 text-red-700' },
};

const Applications: React.FC = () => {
    const [applications, setApplications] = useState<Application[]>([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState<string>('');
    const [selectedApp, setSelectedApp] = useState<Application | null>(null);
    const [reviewNote, setReviewNote] = useState('');
    const [processing, setProcessing] = useState(false);

    const loadApplications = async () => {
        try {
            const endpoint = filter ? `/applications?status=${filter}` : '/applications';
            const result = await get<{ data: Application[] }>(endpoint);
            setApplications(result.data);
        } catch (error) {
            console.error('加载失败:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadApplications();
    }, [filter]);

    const handleApprove = async () => {
        if (!selectedApp) return;
        setProcessing(true);

        try {
            await post(`/applications/${selectedApp.id}/approve`, { review_note: reviewNote });
            setSelectedApp(null);
            setReviewNote('');
            loadApplications();
        } catch (error) {
            alert('操作失败');
        } finally {
            setProcessing(false);
        }
    };

    const handleReject = async () => {
        if (!selectedApp) return;
        setProcessing(true);

        try {
            await post(`/applications/${selectedApp.id}/reject`, { review_note: reviewNote });
            setSelectedApp(null);
            setReviewNote('');
            loadApplications();
        } catch (error) {
            alert('操作失败');
        } finally {
            setProcessing(false);
        }
    };

    const formatDate = (dateStr: string) => {
        return new Date(dateStr).toLocaleString('zh-CN', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    const pendingCount = applications.filter(a => a.status === 'pending').length;

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
                title="领养审批"
                subtitle={pendingCount > 0 ? `${pendingCount} 条待审批` : '暂无待审批申请'}
            />

            <main className="flex-1 p-8 overflow-auto">
                {/* 筛选器 */}
                <div className="flex gap-2 mb-6">
                    {['', 'pending', 'approved', 'rejected'].map((status) => (
                        <button
                            key={status}
                            onClick={() => setFilter(status)}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${filter === status
                                    ? 'bg-primary text-white'
                                    : 'bg-white text-gray-600 hover:bg-gray-100'
                                }`}
                        >
                            {status === '' ? '全部' : statusMap[status as keyof typeof statusMap].label}
                        </button>
                    ))}
                </div>

                {/* 申请列表 */}
                <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-gray-100">
                                <th className="text-left p-4 text-sm font-semibold text-gray-600">宠物</th>
                                <th className="text-left p-4 text-sm font-semibold text-gray-600">申请人</th>
                                <th className="text-left p-4 text-sm font-semibold text-gray-600">联系电话</th>
                                <th className="text-left p-4 text-sm font-semibold text-gray-600">申请时间</th>
                                <th className="text-left p-4 text-sm font-semibold text-gray-600">状态</th>
                                <th className="text-left p-4 text-sm font-semibold text-gray-600">操作</th>
                            </tr>
                        </thead>
                        <tbody>
                            {applications.map((app) => (
                                <tr key={app.id} className="border-b border-gray-50 hover:bg-gray-50">
                                    <td className="p-4">
                                        <div className="flex items-center gap-3">
                                            {app.pets?.image && (
                                                <img src={app.pets.image} className="w-10 h-10 rounded-lg object-cover" />
                                            )}
                                            <div>
                                                <p className="font-medium text-gray-900">{app.pets?.name || '未知'}</p>
                                                <p className="text-xs text-gray-400">{app.pets?.breed}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="p-4 text-gray-700">{app.applicant_name}</td>
                                    <td className="p-4 text-gray-700">{app.phone}</td>
                                    <td className="p-4 text-gray-500 text-sm">{formatDate(app.created_at)}</td>
                                    <td className="p-4">
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusMap[app.status].color}`}>
                                            {statusMap[app.status].label}
                                        </span>
                                    </td>
                                    <td className="p-4">
                                        <button
                                            onClick={() => setSelectedApp(app)}
                                            className="text-primary hover:text-primary-dark font-medium text-sm"
                                        >
                                            查看详情
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            {applications.length === 0 && (
                                <tr>
                                    <td colSpan={6} className="p-8 text-center text-gray-400">
                                        暂无申请记录
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </main>

            {/* 详情弹窗 */}
            {selectedApp && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-auto">
                        <div className="sticky top-0 bg-white border-b border-gray-100 p-6 flex items-center justify-between">
                            <h3 className="text-xl font-bold">申请详情</h3>
                            <button onClick={() => setSelectedApp(null)} className="text-gray-400 hover:text-gray-600">
                                <span className="material-symbols-outlined">close</span>
                            </button>
                        </div>

                        <div className="p-6 space-y-6">
                            {/* 宠物信息 */}
                            {selectedApp.pets && (
                                <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                                    <img src={selectedApp.pets.image} className="w-20 h-20 rounded-xl object-cover" />
                                    <div>
                                        <h4 className="font-bold text-lg">{selectedApp.pets.name}</h4>
                                        <p className="text-gray-500">{selectedApp.pets.breed}</p>
                                    </div>
                                </div>
                            )}

                            {/* 申请人信息 */}
                            <div className="space-y-4">
                                <h4 className="font-semibold text-gray-900">申请人信息</h4>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-sm text-gray-400">姓名</label>
                                        <p className="text-gray-900">{selectedApp.applicant_name}</p>
                                    </div>
                                    <div>
                                        <label className="text-sm text-gray-400">电话</label>
                                        <p className="text-gray-900">{selectedApp.phone}</p>
                                    </div>
                                    <div>
                                        <label className="text-sm text-gray-400">职业</label>
                                        <p className="text-gray-900">{selectedApp.occupation || '-'}</p>
                                    </div>
                                    <div>
                                        <label className="text-sm text-gray-400">申请时间</label>
                                        <p className="text-gray-900">{formatDate(selectedApp.created_at)}</p>
                                    </div>
                                </div>
                            </div>

                            {/* 问卷信息 */}
                            <div className="space-y-4">
                                <h4 className="font-semibold text-gray-900">问卷信息</h4>
                                <div className="space-y-2">
                                    <div className="flex items-center gap-2">
                                        <span className={`material-symbols-outlined ${selectedApp.has_pets ? 'text-green-500' : 'text-gray-300'}`}>
                                            {selectedApp.has_pets ? 'check_circle' : 'cancel'}
                                        </span>
                                        <span className="text-gray-700">家中已有宠物</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className={`material-symbols-outlined ${selectedApp.family_agreed ? 'text-green-500' : 'text-gray-300'}`}>
                                            {selectedApp.family_agreed ? 'check_circle' : 'cancel'}
                                        </span>
                                        <span className="text-gray-700">家人同意领养</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className={`material-symbols-outlined ${selectedApp.accept_followup ? 'text-green-500' : 'text-gray-300'}`}>
                                            {selectedApp.accept_followup ? 'check_circle' : 'cancel'}
                                        </span>
                                        <span className="text-gray-700">接受回访</span>
                                    </div>
                                </div>
                                {selectedApp.reason && (
                                    <div>
                                        <label className="text-sm text-gray-400">领养理由</label>
                                        <p className="text-gray-900 mt-1">{selectedApp.reason}</p>
                                    </div>
                                )}
                            </div>

                            {/* 环境照片 */}
                            {selectedApp.environment_photos?.length > 0 && (
                                <div className="space-y-4">
                                    <h4 className="font-semibold text-gray-900">环境照片</h4>
                                    <div className="flex gap-2 flex-wrap">
                                        {selectedApp.environment_photos.map((photo, index) => (
                                            <img key={index} src={photo} className="w-24 h-24 rounded-xl object-cover" />
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* 审批操作 */}
                            {selectedApp.status === 'pending' && (
                                <div className="space-y-4 pt-4 border-t border-gray-100">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">审批备注</label>
                                        <textarea
                                            value={reviewNote}
                                            onChange={(e) => setReviewNote(e.target.value)}
                                            rows={2}
                                            placeholder="可选，填写审批备注..."
                                            className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                                        />
                                    </div>
                                    <div className="flex gap-4">
                                        <button
                                            onClick={handleReject}
                                            disabled={processing}
                                            className="flex-1 py-3 border border-red-200 text-red-500 rounded-xl font-medium hover:bg-red-50 disabled:opacity-50"
                                        >
                                            {processing ? '处理中...' : '拒绝'}
                                        </button>
                                        <button
                                            onClick={handleApprove}
                                            disabled={processing}
                                            className="flex-1 py-3 bg-teal-accent text-white rounded-xl font-medium hover:bg-teal-600 disabled:opacity-50"
                                        >
                                            {processing ? '处理中...' : '通过'}
                                        </button>
                                    </div>
                                    <p className="text-xs text-gray-400 text-center">
                                        通过后将自动通知申请人，并在 App 端下线该宠物
                                    </p>
                                </div>
                            )}

                            {/* 已审批状态 */}
                            {selectedApp.status !== 'pending' && (
                                <div className="pt-4 border-t border-gray-100">
                                    <div className={`p-4 rounded-xl ${selectedApp.status === 'approved' ? 'bg-green-50' : 'bg-red-50'}`}>
                                        <p className={`font-medium ${selectedApp.status === 'approved' ? 'text-green-700' : 'text-red-700'}`}>
                                            {selectedApp.status === 'approved' ? '✅ 已通过审批' : '❌ 已拒绝'}
                                        </p>
                                        {selectedApp.reviewed_at && (
                                            <p className="text-sm text-gray-500 mt-1">审批时间：{formatDate(selectedApp.reviewed_at)}</p>
                                        )}
                                        {selectedApp.review_note && (
                                            <p className="text-sm text-gray-600 mt-2">备注：{selectedApp.review_note}</p>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Applications;

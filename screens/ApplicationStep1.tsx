
import React, { useState } from 'react';
import { ApplicationFormDataStep1 } from '../App';

interface ApplicationStep1Props {
  onBack: () => void;
  onNext: (formData: ApplicationFormDataStep1) => void;
  initialData?: ApplicationFormDataStep1;
}

const ApplicationStep1: React.FC<ApplicationStep1Props> = ({ onBack, onNext, initialData }) => {
  // 表单状态
  const [applicantName, setApplicantName] = useState(initialData?.applicantName || '');
  const [phone, setPhone] = useState(initialData?.phone || '');
  const [occupation, setOccupation] = useState(initialData?.occupation || '');
  const [reason, setReason] = useState(initialData?.reason || '');
  const [errors, setErrors] = useState<{ name?: string; phone?: string }>({});

  // 表单验证
  const validateForm = (): boolean => {
    const newErrors: { name?: string; phone?: string } = {};

    if (!applicantName.trim()) {
      newErrors.name = '请输入您的姓名';
    }

    if (!phone.trim()) {
      newErrors.phone = '请输入联系电话';
    } else if (!/^1[3-9]\d{9}$/.test(phone.replace(/\s/g, ''))) {
      newErrors.phone = '请输入有效的手机号码';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // 处理下一步
  const handleNext = () => {
    if (validateForm()) {
      onNext({
        applicantName: applicantName.trim(),
        phone: phone.replace(/\s/g, ''),
        occupation: occupation.trim(),
        reason: reason.trim(),
      });
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-background-dark">
      <header className="sticky top-0 z-10 bg-white dark:bg-background-dark border-b border-gray-100 dark:border-gray-800">
        <div className="flex items-center p-4">
          <button onClick={onBack} className="size-10 flex items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-white/5">
            <span className="material-symbols-outlined">arrow_back_ios_new</span>
          </button>
          <h2 className="flex-1 text-center text-lg font-bold pr-10">申请领养</h2>
        </div>
        <div className="px-4">
          <div className="flex">
            <div className="flex-1 flex flex-col items-center">
              <span className="text-primary text-xs font-bold pb-2">基础信息</span>
              <div className="w-full h-1 bg-primary rounded-t-full"></div>
            </div>
            <div className="flex-1 flex flex-col items-center">
              <span className="text-gray-300 text-xs font-bold pb-2">环境信息</span>
              <div className="w-full h-1 bg-gray-100 dark:bg-gray-800 rounded-t-full"></div>
            </div>
            <div className="flex-1 flex flex-col items-center">
              <span className="text-gray-300 text-xs font-bold pb-2">领养理由</span>
              <div className="w-full h-1 bg-gray-100 dark:bg-gray-800 rounded-t-full"></div>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 p-6 pb-32">
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">开启您的领养之旅</h1>
          <p className="text-gray-400 font-medium mt-1">第 1 步 / 共 3 步：请简单介绍一下您自己。</p>
        </div>

        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700 dark:text-gray-300">
              真实姓名 <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-gray-400">person</span>
              <input
                type="text"
                value={applicantName}
                onChange={(e) => setApplicantName(e.target.value)}
                placeholder="请输入您的姓名"
                className={`w-full h-14 pl-12 pr-4 rounded-2xl bg-gray-50 dark:bg-gray-900 border-none ring-1 ${errors.name ? 'ring-red-500' : 'ring-gray-200 dark:ring-gray-800'} focus:ring-2 focus:ring-primary font-medium`}
              />
            </div>
            {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700 dark:text-gray-300">
              联系电话 <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-gray-400">call</span>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="138 0000 0000"
                className={`w-full h-14 pl-12 pr-4 rounded-2xl bg-gray-50 dark:bg-gray-900 border-none ring-1 ${errors.phone ? 'ring-red-500' : 'ring-gray-200 dark:ring-gray-800'} focus:ring-2 focus:ring-primary font-medium`}
              />
            </div>
            {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700 dark:text-gray-300">您的职业</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-gray-400">work</span>
              <input
                type="text"
                value={occupation}
                onChange={(e) => setOccupation(e.target.value)}
                placeholder="例如：设计师"
                className="w-full h-14 pl-12 pr-4 rounded-2xl bg-gray-50 dark:bg-gray-900 border-none ring-1 ring-gray-200 dark:ring-gray-800 focus:ring-2 focus:ring-primary font-medium"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700 dark:text-gray-300">为什么想领养？</label>
            <textarea
              rows={4}
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="请简单描述您的初衷..."
              className="w-full p-4 rounded-2xl bg-gray-50 dark:bg-gray-900 border-none ring-1 ring-gray-200 dark:ring-gray-800 focus:ring-2 focus:ring-primary font-medium resize-none"
            />
          </div>
        </div>
      </main>

      {/* FIXED WIDTH AND CENTERED */}
      <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto p-6 pb-10 bg-gradient-to-t from-white dark:from-background-dark via-white dark:via-background-dark to-transparent">
        <button
          onClick={handleNext}
          className="w-full h-14 rounded-2xl bg-primary text-white font-bold shadow-lg shadow-primary/30 flex items-center justify-center gap-2"
        >
          下一步
          <span className="material-symbols-outlined">arrow_forward</span>
        </button>
      </div>
    </div>
  );
};

export default ApplicationStep1;


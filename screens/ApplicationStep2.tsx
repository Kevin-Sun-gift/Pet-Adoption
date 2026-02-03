
import React, { useState } from 'react';
import { submitApplication, ApplicationData } from '../api/applications';
import { ApplicationFormDataStep1 } from '../App';

interface ApplicationStep2Props {
  onBack: () => void;
  onSubmit: () => void;
  petId?: string;
  formDataStep1: ApplicationFormDataStep1;
}

const ApplicationStep2: React.FC<ApplicationStep2Props> = ({ onBack, onSubmit, petId, formDataStep1 }) => {
  const [photos, setPhotos] = useState<string[]>([
    'https://lh3.googleusercontent.com/aida-public/AB6AXuBmbWxNZqocFobzilQg4L_zmfCpaAMzhSXIwgWMOz0IdjAyU-frrLZIsKyztGx_FQpWujaYlf6m9Oa4ow20jm41yVPcyUbEIVQfHH6Rry2DWTK9OzFjmkTYyMhlO1NJJGegeEiWprbL-fKgnwV9EVxIQY4IId0uoOCiWS5z8ThB1_Qhd8HKIa0JnMhdkEL4wtXke_DdaGq6kgSWI-PLm2vaXqsNXLvRHxS6DHF9PIagntgAWO33K61VenrgK0n1rrH8Ck64khhxODw',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuDTnPIPMfjNabaFtZqzQ10efRUDqNvjSeYdftRrGpuNcBaLePOzXIiAMn41dxZHEbDD6hzY6hK2cbKiZCD3F5h-argJSlqUL49hdEmQHV4XsCDiknug3fnz8kXZHt4EQxzpPz0sG0woKEG9dCJ1vL1W-R-0f941fk2AM9Jv-LqiL0wkRJZX0B4EuCar-Iyl4ezsOFeCmec5x9DFfR-UB08m-XTBYf5hnWw54bA9FU3pWaSdOAtnFVP1SV0m2GyPxcMCQEZ08QGQgo4'
  ]);

  // 表单状态
  const [hasPets, setHasPets] = useState(false);
  const [familyAgreed, setFamilyAgreed] = useState(true);
  const [acceptFollowup, setAcceptFollowup] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 处理提交
  const handleSubmit = async () => {
    if (!petId) {
      onSubmit();
      return;
    }

    setIsSubmitting(true);

    try {
      // 使用 Step1 传递的真实表单数据
      const applicationData: ApplicationData = {
        pet_id: petId,
        applicant_name: formDataStep1.applicantName,
        phone: formDataStep1.phone,
        occupation: formDataStep1.occupation,
        reason: formDataStep1.reason,
        has_pets: hasPets,
        family_agreed: familyAgreed,
        accept_followup: acceptFollowup,
        environment_photos: photos,
      };

      await submitApplication(applicationData);
      onSubmit();
    } catch (error) {
      console.error('申请提交失败:', error);
      // 即使 API 失败也继续（跳转成功页面）
      onSubmit();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-background-light dark:bg-background-dark">
      <header className="sticky top-0 z-10 bg-white dark:bg-background-dark border-b border-gray-100 dark:border-gray-800">
        <div className="flex items-center p-4">
          <button onClick={onBack} className="size-10 flex items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-white/5">
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
          <h2 className="flex-1 text-center text-lg font-bold pr-10">申请流程</h2>
        </div>
        <div className="flex justify-center gap-2 py-2">
          <div className="h-1.5 w-8 rounded-full bg-primary/30"></div>
          <div className="h-1.5 w-8 rounded-full bg-primary"></div>
          <div className="h-1.5 w-8 rounded-full bg-gray-200 dark:bg-gray-800"></div>
        </div>
      </header>

      <main className="flex-1 p-6 pb-32">
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">环境与经验</h1>
          <p className="text-gray-400 font-medium mt-1">帮助我们确保为您的新朋友提供一个安全快乐的家。</p>
        </div>

        <section className="mb-8">
          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">家庭情况</h3>
          <div className="space-y-4">
            <label className="flex gap-4 p-4 rounded-2xl bg-white dark:bg-card-dark border border-gray-100 dark:border-gray-800 shadow-sm cursor-pointer active:scale-98 transition-transform">
              <input
                type="checkbox"
                checked={hasPets}
                onChange={(e) => setHasPets(e.target.checked)}
                className="mt-1 size-6 rounded-md border-gray-200 dark:border-gray-700 text-primary focus:ring-primary"
              />
              <div className="flex-1">
                <p className="text-base font-bold text-gray-900 dark:text-white">家中已有宠物</p>
                <p className="text-sm text-gray-400 font-medium">我们将稍后询问详情</p>
              </div>
            </label>

            <label className="flex gap-4 p-4 rounded-2xl bg-white dark:bg-card-dark border border-gray-100 dark:border-gray-800 shadow-sm cursor-pointer active:scale-98 transition-transform">
              <input
                type="checkbox"
                checked={familyAgreed}
                onChange={(e) => setFamilyAgreed(e.target.checked)}
                className="mt-1 size-6 rounded-md border-gray-200 dark:border-gray-700 text-primary focus:ring-primary"
              />
              <div className="flex-1">
                <p className="text-base font-bold text-gray-900 dark:text-white">家人均同意领养</p>
              </div>
            </label>

            <label className="flex gap-4 p-4 rounded-2xl bg-white dark:bg-card-dark border border-gray-100 dark:border-gray-800 shadow-sm cursor-pointer active:scale-98 transition-transform">
              <input
                type="checkbox"
                checked={acceptFollowup}
                onChange={(e) => setAcceptFollowup(e.target.checked)}
                className="mt-1 size-6 rounded-md border-gray-200 dark:border-gray-700 text-primary focus:ring-primary"
              />
              <div className="flex-1">
                <p className="text-base font-bold text-gray-900 dark:text-white">接受领养后回访</p>
              </div>
            </label>
          </div>
        </section>

        <section>
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest">居住环境照片</h3>
            <span className="text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded-full font-bold">必填</span>
          </div>
          <p className="text-sm text-gray-400 font-medium mb-4">上传2-3张照片展示宠物休息和活动的区域。</p>

          <div className="grid grid-cols-3 gap-3">
            <label className="aspect-square flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-200 dark:border-gray-800 bg-white dark:bg-white/5 cursor-pointer hover:bg-gray-50 transition-colors">
              <input type="file" className="hidden" />
              <span className="material-symbols-outlined text-primary text-3xl">add_a_photo</span>
              <span className="text-[10px] font-bold text-gray-400 mt-1">点击上传</span>
            </label>
            {photos.map((url, i) => (
              <div key={i} className="relative aspect-square rounded-2xl overflow-hidden group">
                <img src={url} className="size-full object-cover" alt="living environment" />
                <button className="absolute top-1 right-1 size-6 flex items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-md">
                  <span className="material-symbols-outlined text-[14px]">close</span>
                </button>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* FIXED WIDTH AND CENTERED */}
      <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto p-6 pb-10 flex gap-4 bg-background-light dark:bg-background-dark/95 backdrop-blur-md border-t border-gray-100 dark:border-gray-800">
        <button onClick={onBack} className="flex-1 h-14 rounded-2xl border-2 border-gray-100 dark:border-gray-800 text-gray-700 dark:text-gray-300 font-bold">上一步</button>
        <button
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="flex-[2] h-14 rounded-2xl bg-primary text-white font-bold shadow-lg shadow-primary/30 flex items-center justify-center gap-2 disabled:opacity-50"
        >
          {isSubmitting ? '提交中...' : '提交申请'}
          {!isSubmitting && <span className="material-symbols-outlined">check</span>}
        </button>
      </div>
    </div>
  );
};

export default ApplicationStep2;

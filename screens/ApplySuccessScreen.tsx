
import React from 'react';

interface ApplySuccessScreenProps {
  onBackToHome: () => void;
}

const ApplySuccessScreen: React.FC<ApplySuccessScreenProps> = ({ onBackToHome }) => {
  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-background-dark items-center justify-center px-8 text-center">
      <div className="mb-10 relative">
        <div className="size-32 rounded-full bg-green-50 dark:bg-green-950/20 flex items-center justify-center animate-bounce">
          <span className="material-symbols-outlined text-[80px] text-green-500">check_circle</span>
        </div>
        <div className="absolute -top-4 -right-4 size-10 rounded-full bg-primary flex items-center justify-center text-white border-4 border-white dark:border-background-dark">
          <span className="material-symbols-outlined text-[20px]">pets</span>
        </div>
      </div>

      <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-4">申请提交成功！</h1>
      <p className="text-gray-500 dark:text-gray-400 font-medium leading-relaxed mb-12">
        您的领养申请已成功发送至领养中心。审核人员将在 1-3 个工作日内处理您的申请，请留意“消息”通知。
      </p>

      <div className="w-full space-y-4">
        <button 
          onClick={onBackToHome}
          className="w-full h-16 rounded-2xl bg-primary text-white font-bold text-lg shadow-lg shadow-primary/30 active:scale-95 transition-transform"
        >
          查看申请进度
        </button>
        <button 
          onClick={onBackToHome}
          className="w-full h-16 rounded-2xl bg-gray-50 dark:bg-white/5 text-gray-700 dark:text-gray-300 font-bold text-lg border border-gray-100 dark:border-gray-800 active:scale-95 transition-transform"
        >
          回到首页
        </button>
      </div>

      <div className="mt-12 flex items-center gap-2 text-primary font-bold text-sm">
        <span className="material-symbols-outlined text-[18px]">info</span>
        <span>您可以随时通过“我的单据”修改资料</span>
      </div>
    </div>
  );
};

export default ApplySuccessScreen;

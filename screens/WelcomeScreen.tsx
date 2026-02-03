
import React from 'react';

interface WelcomeScreenProps {
  onStart: () => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onStart }) => {
  return (
    <div className="relative flex flex-col h-screen overflow-hidden bg-background-light dark:bg-background-dark">
      <div className="relative w-full flex-[1.2] min-h-[50vh] overflow-hidden rounded-b-[2.5rem]">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat" 
          style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBhOf-CUn28oGcQV0dSCdrdNprLllipgSzZCVRx4Xsi2y1O1J270DvbSFeGl9ftrAmrZJSczV7BBKTFhtGkoANxhRPDXyBNJIfwF-bPQNYh_AI72X3lHsbUA81m3OT7ZTqJidSkJwqFDxL3EKn0VbdSLbdlfg8B197yWYlPZQcKlgrBiopi8RZLEF0bHWJAuer6ttMyplbIH6lUkarMtvZ1elFI1lC2EuqJFkM0LDd4PERMzlJZyOaDn2tuQmQQpQPVkMJfSDljavI")' }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background-light/30 dark:to-background-dark/30"></div>
        </div>
      </div>
      
      <div className="flex flex-col items-center justify-end px-8 pb-12 pt-8 flex-1">
        <div className="flex flex-col items-center text-center gap-4 mb-12">
          <h1 className="text-gray-900 dark:text-white tracking-tight text-4xl font-extrabold leading-tight">
            寻找你最好<br/>的朋友
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-lg leading-relaxed max-w-[300px]">
            成千上万的毛孩子正在寻找温暖的家，今天就开始您的爱心之旅吧。
          </p>
        </div>
        
        <div className="w-full space-y-4">
          <button 
            onClick={onStart}
            className="w-full flex items-center justify-center rounded-2xl h-16 bg-primary hover:bg-primary/90 transition-all text-white text-lg font-bold shadow-lg shadow-primary/20"
          >
            立即开始
          </button>
          <button className="w-full flex items-center justify-center rounded-2xl h-16 bg-white dark:bg-white/5 border-2 border-gray-100 dark:border-white/10 hover:bg-gray-50 dark:hover:bg-white/10 transition-all text-gray-900 dark:text-white text-lg font-bold">
            我已有账号
          </button>
        </div>
      </div>
    </div>
  );
};

export default WelcomeScreen;

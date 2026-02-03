
import React from 'react';
import { Pet } from '../types';

interface DetailScreenProps {
  pet: Pet;
  onBack: () => void;
  onApply: () => void;
  onChat: () => void;
}

const DetailScreen: React.FC<DetailScreenProps> = ({ pet, onBack, onApply, onChat }) => {
  return (
    <div className="flex flex-col min-h-screen bg-background-light dark:bg-background-dark pb-32">
      {/* Hero Image */}
      <div className="relative h-[45vh] w-full shrink-0">
        <div 
          className="size-full bg-cover bg-center"
          style={{ backgroundImage: `url("${pet.image}")` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-transparent opacity-60"></div>
        <div className="absolute top-0 left-0 w-full p-4 pt-12 flex justify-between items-center z-10">
          <button 
            onClick={onBack}
            className="size-10 flex items-center justify-center rounded-full bg-white/20 backdrop-blur-md text-white border border-white/20 active:scale-90 transition-transform"
          >
            <span className="material-symbols-outlined">arrow_back_ios_new</span>
          </button>
          <button className="size-10 flex items-center justify-center rounded-full bg-white/20 backdrop-blur-md text-white border border-white/20 active:scale-90 transition-transform">
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>favorite</span>
          </button>
        </div>
        <div className="absolute bottom-10 left-0 right-0 flex justify-center gap-2">
          <div className="h-1.5 w-6 rounded-full bg-primary"></div>
          <div className="size-1.5 rounded-full bg-white/60"></div>
          <div className="size-1.5 rounded-full bg-white/60"></div>
        </div>
      </div>

      {/* Content */}
      <div className="relative -mt-8 flex flex-col rounded-t-[40px] bg-background-light dark:bg-background-dark px-6 pt-8 z-20 shadow-[0_-10px_30px_rgba(0,0,0,0.1)]">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight leading-tight">{pet.name}</h1>
            <p className="text-gray-500 dark:text-gray-400 font-semibold mt-1">{pet.breed}</p>
            <div className="flex items-center gap-1 text-gray-400 text-sm mt-3">
              <span className="material-symbols-outlined text-[18px]">location_on</span>
              <span className="font-medium">{pet.location} • {pet.distance}</span>
            </div>
          </div>
          <div className="text-right">
            <span className="text-3xl font-black text-primary">${pet.price}</span>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">领养费</p>
          </div>
        </div>

        {/* Stats */}
        <div className="flex gap-3 overflow-x-auto hide-scrollbar mb-8">
          {[
            { icon: 'male', label: pet.gender === 'male' ? '公' : '母' },
            { icon: 'calendar_today', label: pet.age },
            { icon: 'monitor_weight', label: pet.weight || '未知' }
          ].map((stat, i) => (
            <div key={i} className="flex h-12 shrink-0 items-center gap-2 rounded-2xl bg-white dark:bg-[#2c241b] border border-gray-100 dark:border-gray-800 shadow-sm px-4">
              <span className="material-symbols-outlined text-primary">{stat.icon}</span>
              <span className="text-sm font-bold text-gray-700 dark:text-gray-200">{stat.label}</span>
            </div>
          ))}
        </div>

        {/* Owner Card */}
        <div className="flex items-center gap-4 p-4 rounded-[24px] bg-white dark:bg-[#2c241b] border border-gray-100 dark:border-gray-800 shadow-sm mb-8">
          <img src={pet.owner.avatar} className="size-12 rounded-full object-cover border-2 border-primary/20" alt={pet.owner.name} />
          <div className="flex-1">
            <h3 className="text-base font-bold text-gray-900 dark:text-white">{pet.owner.name}</h3>
            <p className="text-xs font-semibold text-gray-400">{pet.owner.role}</p>
          </div>
          <button 
            onClick={onChat}
            className="size-10 flex items-center justify-center rounded-full bg-primary/10 text-primary"
          >
            <span className="material-symbols-outlined text-[20px]">chat_bubble</span>
          </button>
        </div>

        {/* Bio */}
        <div className="mb-8">
          <h2 className="text-xl font-extrabold text-gray-900 dark:text-white mb-3">关于 {pet.name}</h2>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed font-medium">
            {pet.description}
          </p>
        </div>

        {/* Health */}
        <div className="mb-8">
          <h2 className="text-xl font-extrabold text-gray-900 dark:text-white mb-4">健康状况</h2>
          <div className="grid grid-cols-2 gap-3">
            {pet.health.map((h, i) => (
              <div key={i} className="flex items-center gap-3 p-3 rounded-2xl bg-primary/5 dark:bg-primary/10 border border-primary/10">
                <div className="size-6 rounded-full bg-primary/20 flex items-center justify-center">
                  <span className="material-symbols-outlined text-primary text-[14px] font-bold">check</span>
                </div>
                <span className="text-sm font-bold text-gray-700 dark:text-gray-200">{h}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Map */}
        <div className="mb-8">
          <h2 className="text-xl font-extrabold text-gray-900 dark:text-white mb-4">所在地</h2>
          <div className="relative h-40 rounded-[28px] overflow-hidden">
            <div 
              className="size-full bg-cover bg-center" 
              style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuChx6WiBvAShsasoSNSYzspw4DbMKABv4un8828ifvTFa0rAeVV1VcG5gdikwPZECvQTUk_Vqlfzolf5bsvlxXuMDytfKHEVemqb_UMeTEEhJGi_z_DJfnIyxdhtYcJ9_-JVm1Av975oAKmedFlqFZeSf1WWUunc-bKgA0T_8gc5iu--kYEgzaLh0z8VmStQ9eQYaAVxEpTGYmaBsauSRLwEsB8YQ0BxsFGWkuGSD9uR0XUfCHRCSxpATYNTy2hm5CIHamEOfzQVJ8')" }} 
            />
            <div className="absolute inset-0 bg-black/10 flex items-center justify-center">
              <div className="size-10 rounded-full bg-primary text-white flex items-center justify-center shadow-lg border-2 border-white">
                <span className="material-symbols-outlined">pets</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky CTAs - FIXED WIDTH AND CENTERED */}
      <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white/95 dark:bg-[#1f1912]/95 backdrop-blur-md border-t border-gray-100 dark:border-white/5 px-6 py-6 pb-10 z-50">
        <div className="flex gap-4">
          <button 
            onClick={onChat}
            className="flex-1 h-14 rounded-2xl border-2 border-primary/30 text-primary font-bold active:scale-95 transition-transform flex items-center justify-center gap-2"
          >
            <span className="material-symbols-outlined">chat</span>
            咨询
          </button>
          <button 
            onClick={onApply}
            className="flex-[2] h-14 rounded-2xl bg-primary text-white font-bold shadow-lg shadow-primary/30 active:scale-95 transition-transform flex items-center justify-center gap-2"
          >
            <span className="material-symbols-outlined">pets</span>
            申请领养
          </button>
        </div>
      </div>
    </div>
  );
};

export default DetailScreen;

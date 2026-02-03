
import React from 'react';

const ProfileScreen: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-background-light dark:bg-background-dark pb-8">
      <header className="relative pt-16 pb-8 px-4 flex flex-col items-center bg-gradient-to-b from-teal-accent/10 to-transparent">
        <div className="relative mb-4">
          <div 
            className="size-28 rounded-full border-4 border-white dark:border-background-dark shadow-lg bg-cover bg-center"
            style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuC1d5VUZCZvdkYG1UJLxDjt6BYyI3lVUGbwt5fcePZBixv6WGCOQEAumXU5K9kRof65eHvhp3SbeMefnIMJwaK4MEhrm744AVSn8H2hBJclkk5So6htfNqBbvVUt1qjasG71vTJMSPhwECYHFqpVuU7XJNjbQnn4iOJFP_JW3a7yfG_s9weuoHlwTeEhShPUCeXAX6turRA0qsd5ZFzbGfsktq4lqLMNMUZA9-g8Dooda0zgJ7Q9XlkU9CoexSJ-bybZlTD8GiF1qk')" }}
          />
          <div className="absolute -bottom-2 -right-2 size-8 flex items-center justify-center rounded-full bg-primary text-white ring-4 ring-white dark:ring-background-dark">
            <span className="material-symbols-outlined text-[16px]">verified</span>
          </div>
        </div>
        <h1 className="text-2xl font-black text-gray-900 dark:text-white">Sarah Jenkins</h1>
        <div className="mt-1 px-3 py-1 rounded-full bg-teal-accent/10 text-teal-accent text-[10px] font-black uppercase tracking-widest">
          已认证领养人
        </div>
      </header>

      <section className="px-6 mb-6">
        <div className="grid grid-cols-3 gap-4 p-4 rounded-3xl bg-white dark:bg-card-dark shadow-sm border border-gray-100 dark:border-gray-800">
          {[
            { label: '审核中', count: 1, icon: 'description', color: 'text-orange-500' },
            { label: '待家访', count: 0, icon: 'home', color: 'text-teal-accent' },
            { label: '已成功', count: 2, icon: 'pets', color: 'text-green-500' }
          ].map((stat, i) => (
            <div key={i} className="flex flex-col items-center gap-2">
              <div className={`size-12 flex items-center justify-center rounded-full bg-gray-50 dark:bg-white/5 ${stat.color} relative`}>
                <span className="material-symbols-outlined">{stat.icon}</span>
                {stat.count > 0 && (
                  <span className="absolute -top-1 -right-1 size-5 flex items-center justify-center rounded-full bg-primary text-white text-[10px] font-bold border-2 border-white dark:border-card-dark">
                    {stat.count}
                  </span>
                )}
              </div>
              <span className="text-xs font-bold text-gray-400">{stat.label}</span>
            </div>
          ))}
        </div>
      </section>

      <main className="px-6 space-y-3">
        <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">我的账户</h3>
        {[
          { icon: 'favorite', label: '我的收藏', color: 'text-red-500', bg: 'bg-red-50' },
          { icon: 'assignment', label: '我的申请', color: 'text-blue-500', bg: 'bg-blue-50', badge: '1个进行中' },
          { icon: 'lightbulb', label: '养宠百科', color: 'text-primary', bg: 'bg-orange-50' }
        ].map((item, i) => (
          <button key={i} className="w-full flex items-center justify-between p-4 bg-white dark:bg-card-dark rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm">
            <div className="flex items-center gap-4">
              <div className={`size-10 flex items-center justify-center rounded-full ${item.bg} dark:bg-white/5 ${item.color}`}>
                <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
              </div>
              <span className="text-base font-bold text-gray-900 dark:text-white">{item.label}</span>
            </div>
            <div className="flex items-center gap-2">
              {item.badge && <span className="px-2 py-0.5 rounded-md bg-primary/10 text-primary text-[10px] font-bold">{item.badge}</span>}
              <span className="material-symbols-outlined text-gray-400">chevron_right</span>
            </div>
          </button>
        ))}

        <button className="w-full mt-8 flex items-center justify-center p-4 text-red-500 font-bold">
          退出登录
        </button>
      </main>
    </div>
  );
};

export default ProfileScreen;

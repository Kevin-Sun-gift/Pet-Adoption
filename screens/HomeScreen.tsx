
import React, { useState } from 'react';
import { Pet, Story, Tab } from '../types';
import ProfileScreen from './ProfileScreen';

interface HomeScreenProps {
  pets: Pet[];
  allPets: Pet[]; // 完整宠物列表，用于收藏页
  stories: Story[];
  onPetClick: (pet: Pet) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  activeCategory: 'all' | 'dog' | 'cat' | 'rabbit';
  setActiveCategory: (cat: 'all' | 'dog' | 'cat' | 'rabbit') => void;
  hasNewNotification?: boolean;
  favoriteIds: Set<string>;
  onToggleFavorite: (id: string) => void;
}

const HomeScreen: React.FC<HomeScreenProps> = ({
  pets,
  allPets,
  stories,
  onPetClick,
  searchQuery,
  setSearchQuery,
  activeCategory,
  setActiveCategory,
  hasNewNotification,
  favoriteIds,
  onToggleFavorite
}) => {
  const [activeTab, setActiveTab] = useState<Tab>('home');

  // 使用完整宠物列表筛选收藏
  const favoritedPets = allPets.filter(p => favoriteIds.has(p.id));

  const renderPetCard = (pet: Pet) => {
    const isFavorited = favoriteIds.has(pet.id);
    return (
      <div
        key={pet.id}
        onClick={() => onPetClick(pet)}
        className="group flex flex-col rounded-[24px] bg-white dark:bg-card-dark overflow-hidden shadow-sm border border-gray-100 dark:border-gray-800 transition-all hover:-translate-y-1 hover:shadow-md cursor-pointer relative"
      >
        <div className="relative aspect-[4/5] overflow-hidden">
          <img src={pet.image} alt={pet.name} className="size-full object-cover group-hover:scale-105 transition-transform duration-500" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-40"></div>

          {/* Favorite Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleFavorite(pet.id);
            }}
            className={`absolute top-3 right-3 size-8 flex items-center justify-center rounded-full backdrop-blur-md border transition-all active:scale-90 ${isFavorited
                ? 'bg-primary text-white border-primary shadow-lg shadow-primary/20'
                : 'bg-white/20 text-white border-white/20'
              }`}
          >
            <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: isFavorited ? "'FILL' 1" : "" }}>favorite</span>
          </button>

          <div className="absolute bottom-3 left-3 bg-black/30 backdrop-blur-md rounded-lg px-2 py-1 flex items-center gap-1">
            <span className="material-symbols-outlined text-white text-[12px]">location_on</span>
            <span className="text-[10px] font-bold text-white">{pet.distance}</span>
          </div>
        </div>
        <div className="p-4">
          <h3 className="text-lg font-extrabold text-gray-900 dark:text-white">{pet.name}</h3>
          <p className="text-xs font-medium text-gray-400 truncate">{pet.breed}</p>
          <div className="mt-4 flex gap-2">
            <span className={`px-2 py-1 rounded-md text-[10px] font-bold ${pet.gender === 'male' ? 'bg-orange-50 text-orange-600 dark:bg-orange-950/30 dark:text-orange-300' : 'bg-pink-50 text-pink-600 dark:bg-pink-950/30 dark:text-pink-300'}`}>
              {pet.gender === 'male' ? '公' : '母'}
            </span>
            <span className="px-2 py-1 rounded-md bg-teal-50 text-teal-600 dark:bg-teal-950/30 dark:text-teal-300 text-[10px] font-bold">
              {pet.age}
            </span>
          </div>
        </div>
      </div>
    );
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return (
          <div className="flex flex-col animate-in fade-in duration-300">
            {/* Header */}
            <header className="sticky top-0 z-50 bg-background-light/90 dark:bg-background-dark/90 backdrop-blur-md px-4 py-4">
              <div className="flex items-center justify-between">
                <div className="flex-1 text-center pl-10">
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">地理位置</p>
                  <div className="flex items-center justify-center gap-1">
                    <h2 className="text-lg font-extrabold text-gray-900 dark:text-white">旧金山, 加州</h2>
                    <span className="material-symbols-outlined text-primary text-xl font-bold">expand_more</span>
                  </div>
                </div>
                <button className="size-10 flex items-center justify-center rounded-full bg-white dark:bg-[#332a1d] shadow-sm relative text-gray-900 dark:text-white border border-gray-100 dark:border-white/10">
                  <span className="material-symbols-outlined text-[24px]">notifications</span>
                  {hasNewNotification && <span className="absolute top-2.5 right-2.5 size-2 rounded-full bg-red-500 ring-2 ring-white dark:ring-[#332a1d]"></span>}
                </button>
              </div>
            </header>

            {/* Search */}
            <div className="px-4 py-2">
              <div className="flex items-center gap-2 h-14 rounded-2xl bg-white dark:bg-[#332a1d] shadow-sm ring-1 ring-gray-100 dark:ring-gray-800 px-4 focus-within:ring-2 focus-within:ring-primary transition-all">
                <span className="material-symbols-outlined text-gray-400 dark:text-gray-500">search</span>
                <input
                  type="text"
                  placeholder="寻找你的新伙伴..."
                  className="flex-1 bg-transparent border-none focus:ring-0 text-base font-medium text-gray-900 dark:text-white"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button className="size-10 flex items-center justify-center rounded-xl bg-primary text-white">
                  <span className="material-symbols-outlined text-[20px]">tune</span>
                </button>
              </div>
            </div>

            {/* Stories */}
            <div className="py-6">
              <div className="px-4 mb-4 flex items-center justify-between">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">幸福故事</h3>
                <span className="text-sm font-bold text-primary">查看全部</span>
              </div>
              <div className="flex gap-4 overflow-x-auto hide-scrollbar px-4">
                {stories.map((story, i) => (
                  <div key={story.id} className="flex flex-col items-center gap-2 shrink-0 cursor-pointer group">
                    <div className={`size-[72px] p-[2px] rounded-full group-hover:scale-105 transition-all ${i === 0 ? 'bg-gradient-to-tr from-primary to-teal-accent' : 'bg-gray-200 dark:bg-gray-700'}`}>
                      <div className="size-full rounded-full border-2 border-white dark:border-background-dark overflow-hidden">
                        <img src={story.image} alt={story.title} className="size-full object-cover" />
                      </div>
                    </div>
                    <p className="text-xs font-bold text-gray-600 dark:text-gray-400">{story.title}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Categories */}
            <div className="flex gap-3 px-4 overflow-x-auto hide-scrollbar mb-6">
              {['all', 'dog', 'cat', 'rabbit'].map((catId) => (
                <button
                  key={catId}
                  onClick={() => setActiveCategory(catId as any)}
                  className={`flex h-11 shrink-0 items-center justify-center gap-2 rounded-full px-5 font-bold transition-all ${activeCategory === catId
                      ? 'bg-primary text-white shadow-md shadow-primary/20'
                      : 'bg-white dark:bg-[#332a1d] text-gray-500 dark:text-gray-400 border border-gray-100 dark:border-gray-800'
                    }`}
                >
                  <span className="text-sm">{catId === 'all' ? '全部' : catId === 'dog' ? '狗狗' : catId === 'cat' ? '猫咪' : '小宠'}</span>
                </button>
              ))}
            </div>

            {/* Grid */}
            <div className="px-4 pb-4">
              <div className="grid grid-cols-2 gap-4">
                {pets.map(pet => renderPetCard(pet))}
              </div>
            </div>
          </div>
        );
      case 'profile':
        return <div className="animate-in slide-in-from-right-5 duration-300"><ProfileScreen /></div>;
      case 'message':
        return (
          <div className="flex flex-col min-h-screen animate-in slide-in-from-bottom-5 duration-300">
            <header className="p-6">
              <h1 className="text-2xl font-black text-gray-900 dark:text-white">消息中心</h1>
            </header>
            <div className="px-6 space-y-4">
              {hasNewNotification && (
                <div className="flex items-center gap-4 p-4 rounded-2xl bg-primary/5 border border-primary/10 animate-pulse">
                  <div className="size-12 rounded-full bg-primary flex items-center justify-center text-white">
                    <span className="material-symbols-outlined">assignment_turned_in</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-1">
                      <h4 className="text-sm font-bold text-gray-900 dark:text-white">系统通知</h4>
                      <span className="text-[10px] text-primary font-bold uppercase">刚刚</span>
                    </div>
                    <p className="text-xs text-gray-600 dark:text-gray-400">您的领养申请已提交成功！中心将在24小时内审核。</p>
                  </div>
                </div>
              )}
              <div className="flex items-center gap-4 p-4 rounded-2xl bg-white dark:bg-card-dark border border-gray-100 dark:border-gray-800">
                <div className="size-12 rounded-full bg-gray-100 flex items-center justify-center text-gray-400">
                  <span className="material-symbols-outlined">support_agent</span>
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-1">
                    <h4 className="text-sm font-bold text-gray-900 dark:text-white">客服助手</h4>
                    <span className="text-[10px] text-gray-400 font-bold uppercase">1天前</span>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">欢迎来到 PetLove，有任何疑问请随时咨询。</p>
                </div>
              </div>
            </div>
          </div>
        );
      case 'favorite':
        return (
          <div className="flex flex-col min-h-screen animate-in slide-in-from-bottom-5 duration-300">
            <header className="p-6">
              <h1 className="text-2xl font-black text-gray-900 dark:text-white">我的收藏</h1>
              <p className="text-sm text-gray-400 font-medium mt-1">您心仪的小伙伴们都在这里</p>
            </header>
            {favoritedPets.length > 0 ? (
              <div className="px-4 pb-4">
                <div className="grid grid-cols-2 gap-4">
                  {favoritedPets.map(pet => renderPetCard(pet))}
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center min-h-[60vh] px-8 text-center">
                <div className="size-24 rounded-full bg-gray-50 dark:bg-white/5 flex items-center justify-center text-gray-300 dark:text-gray-700 mb-6">
                  <span className="material-symbols-outlined text-5xl">favorite</span>
                </div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">暂无收藏</h2>
                <p className="text-sm text-gray-400 font-medium leading-relaxed">去首页逛逛吧，也许你会遇到让你心动的毛孩子。</p>
                <button
                  onClick={() => setActiveTab('home')}
                  className="mt-8 px-8 h-12 rounded-xl bg-primary text-white font-bold shadow-lg shadow-primary/20 active:scale-95 transition-transform"
                >
                  去发现
                </button>
              </div>
            )}
          </div>
        );
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-background-light dark:bg-background-dark pb-24">
      {renderContent()}

      {/* Nav - FIXED WIDTH AND CENTERED */}
      <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white/95 dark:bg-[#2d2418]/95 backdrop-blur-md border-t border-gray-100 dark:border-gray-800 pb-8 px-8 h-20 flex items-center justify-between z-50">
        {[
          { id: 'home', icon: 'home', label: '首页' },
          { id: 'favorite', icon: 'favorite', label: '收藏' },
          { id: 'message', icon: 'chat_bubble', label: '消息', badge: hasNewNotification },
          { id: 'profile', icon: 'person', label: '我的' }
        ].map(item => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id as Tab)}
            className={`flex flex-col items-center gap-1 relative transition-all active:scale-95 ${activeTab === item.id ? 'text-primary' : 'text-gray-400 hover:text-gray-500'}`}
          >
            <span className="material-symbols-outlined" style={{ fontVariationSettings: activeTab === item.id ? "'FILL' 1" : "" }}>{item.icon}</span>
            <span className="text-[10px] font-bold">{item.label}</span>
            {item.badge && <span className="absolute top-0 right-1 size-2 rounded-full bg-red-500 ring-2 ring-white dark:ring-[#2d2418]"></span>}
          </button>
        ))}
      </nav>
    </div>
  );
};

export default HomeScreen;

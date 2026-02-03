
import React, { useState, useMemo, useEffect } from 'react';
import { Screen, Pet, Message, Story } from './types';
import { PETS, STORIES } from './constants';
import { fetchPets, fetchStories } from './api/pets';
import { fetchFavorites, toggleFavorite as apiToggleFavorite } from './api/favorites';
import WelcomeScreen from './screens/WelcomeScreen';
import HomeScreen from './screens/HomeScreen';
import DetailScreen from './screens/DetailScreen';
import ApplicationStep1 from './screens/ApplicationStep1';
import ApplicationStep2 from './screens/ApplicationStep2';
import ApplySuccessScreen from './screens/ApplySuccessScreen';
import ChatScreen from './screens/ChatScreen';

// 申请表单基础信息（Step1 收集）
export interface ApplicationFormDataStep1 {
  applicantName: string;
  phone: string;
  occupation: string;
  reason: string;
}

const App: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>('welcome');
  const [selectedPet, setSelectedPet] = useState<Pet | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<'all' | 'dog' | 'cat' | 'rabbit'>('all');
  const [hasApplied, setHasApplied] = useState(false);
  const [favoriteIds, setFavoriteIds] = useState<Set<string>>(new Set());

  // 申请表单数据状态（Step1 -> Step2 传递）
  const [applicationFormData, setApplicationFormData] = useState<ApplicationFormDataStep1>({
    applicantName: '',
    phone: '',
    occupation: '',
    reason: '',
  });

  // 新增：API 数据状态
  const [pets, setPets] = useState<Pet[]>(PETS); // 使用 mock 数据作为默认值
  const [stories, setStories] = useState<Story[]>(STORIES);
  const [isLoading, setIsLoading] = useState(false);
  const [apiAvailable, setApiAvailable] = useState(false);

  // 初始化：尝试从 API 加载数据
  useEffect(() => {
    const initializeData = async () => {
      setIsLoading(true);
      try {
        // 尝试从 API 加载宠物数据
        const petsData = await fetchPets();
        if (petsData && petsData.length > 0) {
          setPets(petsData);
          setApiAvailable(true);
        }

        // 尝试加载故事数据
        const storiesData = await fetchStories();
        if (storiesData && storiesData.length > 0) {
          setStories(storiesData);
        }

        // 加载收藏状态
        const favoritesList = await fetchFavorites();
        if (favoritesList) {
          setFavoriteIds(new Set(favoritesList));
        }
      } catch (error) {
        // API 不可用时使用 mock 数据
        console.log('使用本地 mock 数据');
        setApiAvailable(false);
      } finally {
        setIsLoading(false);
      }
    };

    initializeData();
  }, []);

  // 根据筛选条件过滤宠物
  const filteredPets = useMemo(() => {
    return pets.filter(pet => {
      const matchesCategory = activeCategory === 'all' || pet.type === activeCategory;
      const matchesSearch = pet.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pet.breed.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [pets, searchQuery, activeCategory]);

  const navigateTo = (screen: Screen, pet: Pet | null = null) => {
    if (pet) setSelectedPet(pet);
    setCurrentScreen(screen);
    window.scrollTo(0, 0);
  };

  const handleApplySubmit = () => {
    setHasApplied(true);
    navigateTo('applySuccess');
  };

  // 收藏切换：支持 API 或本地状态
  const toggleFavorite = async (id: string) => {
    const isCurrentlyFavorited = favoriteIds.has(id);

    // 先更新本地状态（乐观更新）
    setFavoriteIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });

    // 如果 API 可用，同步到后端
    if (apiAvailable) {
      try {
        await apiToggleFavorite(id, isCurrentlyFavorited);
      } catch (error) {
        // 回滚本地状态
        setFavoriteIds(prev => {
          const next = new Set(prev);
          if (isCurrentlyFavorited) {
            next.add(id);
          } else {
            next.delete(id);
          }
          return next;
        });
        console.error('收藏同步失败:', error);
      }
    }
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'welcome':
        return <WelcomeScreen onStart={() => navigateTo('home')} />;
      case 'home':
        return (
          <HomeScreen
            pets={filteredPets}
            allPets={pets}
            stories={stories}
            onPetClick={(pet) => navigateTo('detail', pet)}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
            hasNewNotification={hasApplied}
            favoriteIds={favoriteIds}
            onToggleFavorite={toggleFavorite}
          />
        );
      case 'detail':
        return selectedPet ? (
          <DetailScreen
            pet={selectedPet}
            onBack={() => navigateTo('home')}
            onApply={() => {
              // 每次进入申请流程时重置表单数据
              setApplicationFormData({
                applicantName: '',
                phone: '',
                occupation: '',
                reason: '',
              });
              navigateTo('apply1');
            }}
            onChat={() => navigateTo('chat')}
          />
        ) : null;
      case 'apply1':
        return (
          <ApplicationStep1
            onBack={() => navigateTo('detail')}
            onNext={(formData) => {
              setApplicationFormData(formData);
              navigateTo('apply2');
            }}
            initialData={applicationFormData}
          />
        );
      case 'apply2':
        return (
          <ApplicationStep2
            onBack={() => navigateTo('apply1')}
            onSubmit={handleApplySubmit}
            petId={selectedPet?.id}
            formDataStep1={applicationFormData}
          />
        );
      case 'applySuccess':
        return <ApplySuccessScreen onBackToHome={() => navigateTo('home')} />;
      case 'chat':
        return selectedPet ? (
          <ChatScreen pet={selectedPet} onBack={() => navigateTo('detail')} />
        ) : null;
      default:
        return <WelcomeScreen onStart={() => navigateTo('home')} />;
    }
  };

  return (
    <div className="min-h-screen max-w-md mx-auto bg-white dark:bg-background-dark shadow-2xl relative overflow-x-hidden">
      {renderScreen()}
    </div>
  );
};

export default App;

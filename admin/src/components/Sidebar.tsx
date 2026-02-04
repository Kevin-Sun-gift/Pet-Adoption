/**
 * 侧边栏导航组件
 */

import React from 'react';

interface SidebarProps {
    currentPage: string;
    onNavigate: (page: string) => void;
}

const navItems = [
    { id: 'pets', label: '宠物管理', icon: 'pets' },
    { id: 'applications', label: '领养审批', icon: 'fact_check' },
];

const Sidebar: React.FC<SidebarProps> = ({ currentPage, onNavigate }) => {
    return (
        <aside className="w-64 min-h-screen bg-white border-r border-gray-100 flex flex-col">
            {/* Logo */}
            <div className="h-16 flex items-center px-6 border-b border-gray-100">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center">
                        <span className="material-symbols-outlined text-white text-xl">pets</span>
                    </div>
                    <div>
                        <h1 className="text-lg font-bold text-gray-900">PetLove</h1>
                        <p className="text-xs text-gray-400">管理后台</p>
                    </div>
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-4">
                <ul className="space-y-2">
                    {navItems.map((item) => (
                        <li key={item.id}>
                            <button
                                onClick={() => onNavigate(item.id)}
                                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all ${currentPage === item.id
                                        ? 'bg-primary/10 text-primary font-semibold'
                                        : 'text-gray-600 hover:bg-gray-50'
                                    }`}
                            >
                                <span className={`material-symbols-outlined ${currentPage === item.id ? 'text-primary' : 'text-gray-400'
                                    }`}>
                                    {item.icon}
                                </span>
                                {item.label}
                            </button>
                        </li>
                    ))}
                </ul>
            </nav>

            {/* Footer */}
            <div className="p-4 border-t border-gray-100">
                <div className="flex items-center gap-3 px-4 py-2">
                    <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                        <span className="material-symbols-outlined text-gray-500 text-sm">person</span>
                    </div>
                    <div className="flex-1">
                        <p className="text-sm font-medium text-gray-700">管理员</p>
                    </div>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;

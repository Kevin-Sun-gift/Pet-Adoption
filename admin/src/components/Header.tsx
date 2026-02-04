/**
 * 顶部导航栏组件
 */

import React from 'react';

interface HeaderProps {
    title: string;
    subtitle?: string;
    actions?: React.ReactNode;
}

const Header: React.FC<HeaderProps> = ({ title, subtitle, actions }) => {
    return (
        <header className="h-16 bg-white border-b border-gray-100 flex items-center justify-between px-8">
            <div>
                <h2 className="text-xl font-bold text-gray-900">{title}</h2>
                {subtitle && <p className="text-sm text-gray-400">{subtitle}</p>}
            </div>
            {actions && <div className="flex items-center gap-3">{actions}</div>}
        </header>
    );
};

export default Header;

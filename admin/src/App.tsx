/**
 * PetLove 管理后台主应用
 */

import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import PetList from './pages/PetList';
import Applications from './pages/Applications';

const App: React.FC = () => {
    const [currentPage, setCurrentPage] = useState('pets');

    const renderPage = () => {
        switch (currentPage) {
            case 'pets':
                return <PetList />;
            case 'applications':
                return <Applications />;
            default:
                return <PetList />;
        }
    };

    return (
        <div className="flex min-h-screen bg-gray-50">
            <Sidebar currentPage={currentPage} onNavigate={setCurrentPage} />
            {renderPage()}
        </div>
    );
};

export default App;

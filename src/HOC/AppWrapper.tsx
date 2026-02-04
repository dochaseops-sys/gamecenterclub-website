import React, { useState } from 'react'
import Sidebar from '../components/sidebar/Sidebar'
import Header from '../components/header/Header'
import SideAd from '../components/SideAd/SideAd';
import TopBannerAd from '../components/ads/TopBannerAd';
import { useLocation } from 'react-router-dom';
import { useGetCategoriesQuery } from '../services/redux/apis/games';

interface Props {
    children: React.ReactNode;
}

const AppWrapper = ({ children }: Props) => {
    const location = useLocation();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const { data: categories = [] } = useGetCategoriesQuery();

    const categoryIdMatch = location.pathname.match(/^\/category\/(\d+)$/);
    const categoryId = categoryIdMatch ? parseInt(categoryIdMatch[1], 10) : null;
    const isInternalCategory = categoryId ? categories.find(c => c.id === categoryId)?.type === 'internal' : false;

    const showAds = location.pathname !== "/" && !isInternalCategory;

    return (
        <div className="min-h-screen bg-background text-foreground font-body">
            <Header onMenuClick={() => setSidebarOpen(prev => !prev)} />
            <Sidebar
                isOpen={sidebarOpen}
                onClose={() => setSidebarOpen(false)}
            />
            {showAds && <SideAd />}
            <main className={`pt-16 px-3 pb-4 transition-all lg:ml-60 ${showAds ? "lg:mr-[360px]" : ""}`}>
                <div className='hidden lg:block lg:w-0 pt-4 h-full' />
                {showAds && <TopBannerAd />}
                {children}
            </main>
        </div>
    )
}

export default AppWrapper

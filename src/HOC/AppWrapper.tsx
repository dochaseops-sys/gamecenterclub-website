import React, { useState } from 'react'
import Sidebar from '../components/sidebar/Sidebar'
import Header from '../components/header/Header'
// import Footer from '../components/footer/Footer'
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
    const [sidebarCollapsed, setSidebarCollapsed] = useState(true);
    const { data: categories = [] } = useGetCategoriesQuery();

    const categoryIdMatch = location.pathname.match(/^\/category\/(\d+)$/);
    const categoryId = categoryIdMatch ? parseInt(categoryIdMatch[1], 10) : null;
    const isInternalCategory = categoryId ? categories.find(c => c.id === categoryId)?.type === 'internal' : false;

    const showAds = location.pathname !== "/" && !isInternalCategory;

    return (
        <div className="min-h-screen bg-background text-foreground font-body">
            <Header onMenuClick={() => {
                if (window.innerWidth >= 1024) {
                    setSidebarCollapsed(prev => !prev);
                } else {
                    setSidebarOpen(prev => !prev);
                }
            }} />
            <Sidebar
                isOpen={sidebarOpen}
                onClose={() => setSidebarOpen(false)}
                isCollapsed={sidebarCollapsed}
            />
            {showAds && <SideAd />}
            <main className={`pt-16 px-3 pb-4 transition-all ${sidebarCollapsed ? "lg:ml-20" : "lg:ml-60"} ${showAds ? "lg:mr-[240px]" : "mr-0"}`}>
                <div className='hidden lg:block lg:w-0 pt-4 h-full' />
                {showAds && <TopBannerAd />}
                {children}
                {/* <Footer /> */}
            </main>

        </div>
    )
}

export default AppWrapper

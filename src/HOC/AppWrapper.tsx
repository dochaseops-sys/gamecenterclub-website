import React, { useState } from 'react'
import Sidebar from '../components/sidebar/Sidebar'
import Header from '../components/header/Header'
import SideAd from '../components/SideAd/SideAd';
import TopBannerAd from '../components/ads/TopBannerAd';
import { useLocation } from 'react-router-dom';

interface Props {
    children: React.ReactNode;
}

const AppWrapper = ({ children }: Props) => {
    const location = useLocation();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    return (
        <div className="min-h-screen bg-background text-foreground font-body">
            <Header onMenuClick={() => setSidebarOpen(prev => !prev)} />
            <Sidebar
                isOpen={sidebarOpen}
                onClose={() => setSidebarOpen(false)}
            />
            {location.pathname !== "/" && <SideAd />}
            <main className={`pt-16 px-3 pb-4 transition-all lg:ml-60 ${location.pathname !== "/" ? "lg:mr-[360px]" : ""}`}>
                <div className='hidden lg:block lg:w-0 pt-4 h-full' />
                {location.pathname !== "/" && <TopBannerAd />}
                {children}
            </main>

        </div>
    )
}

export default AppWrapper

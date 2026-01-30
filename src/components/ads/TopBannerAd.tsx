
const TopBannerAd = () => {
    return (
        <div className="w-full flex flex-col items-center justify-center gap-4 py-4 mb-6 bg-transparent">
            {/* Desktop Leaderboard - Hidden on Mobile */}
            <div className="hidden lg:flex flex-col gap-4 items-center w-full max-w-4xl">
                {/* 728x90 Leaderboard */}
                <div className="w-[728px] h-[90px] bg-card border border-border flex items-center justify-center relative overflow-hidden rounded-md shadow-sm group">
                    <img
                        src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2070&auto=format&fit=crop"
                        alt="Gaming Gear Ad"
                        className="absolute inset-0 w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                        <span className="text-white/90 text-sm font-bold tracking-wider border border-white/30 px-3 py-1 rounded backdrop-blur-sm">SPONSORED • GAMING GEAR</span>
                    </div>
                </div>
            </div>

            {/* Mobile Banners - Hidden on Desktop */}
            <div className="flex lg:hidden flex-col gap-4 items-center w-full overflow-hidden">
                {/* 300x250 Medium Rectangle */}
                <div className="w-[300px] h-[250px] bg-card border border-border flex items-center justify-center rounded-md relative overflow-hidden shadow-sm group">
                    <img
                        src="https://images.unsplash.com/photo-1593305841991-05c2e449e3df?q=80&w=2060&auto=format&fit=crop"
                        alt="Mobile Game Ad"
                        className="absolute inset-0 w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"
                    />
                    <div className="absolute top-2 right-2">
                        <span className="text-[10px] text-white/80 bg-black/50 px-1 rounded">Ad</span>
                    </div>
                    <div className="absolute bottom-4 left-0 right-0 text-center">
                        <span className="text-white font-bold drop-shadow-md">Play Now</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TopBannerAd;

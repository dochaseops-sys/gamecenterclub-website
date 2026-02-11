import { Gamepad2, Zap,Users, Smartphone, Sparkles } from 'lucide-react';

const WelcomeBanner = () => {
    return (
        <div className="mb-8 bg-gradient-to-r from-[#1a1a2e] to-[#16213e] rounded-2xl border border-white/10 shadow-lg overflow-hidden">
            <div className="p-4 flex flex-col lg:flex-row items-center justify-between gap-6">
                {/* Logo and Welcome Text */}
                <div className="flex items-center gap-4">
                    
                    <div>
                        <h2 className="text-xl md:text-2xl font-black text-white tracking-tight">
                            Welcome to
                        </h2>
                        <p className="text-2xl md:text-3xl font-black text-secondary tracking-tight">
                            {/* Game Center Club */}
                            <img
                        src="/CenterLogoVariant.png"
                        alt="Game Center Club"
                        className="h-10 sm:h-12 md:h-14 w-auto"
                    />
                        </p>
                    </div>
                </div>

                {/* Features */}
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-6 w-full md:w-auto">
                    <div className="flex items-center gap-2 text-white/80 hover:text-white transition-colors">
                        <Gamepad2 size={24} className="text-secondary shrink-0" />
                        <span className="text-xs md:text-sm font-bold whitespace-nowrap">1000+ games</span>
                    </div>
                    <div className="flex items-center gap-2 text-white/80 hover:text-white transition-colors">
                        <Zap size={24} className="text-secondary shrink-0" />
                        <span className="text-xs md:text-sm font-bold whitespace-nowrap">No install needed</span>
                    </div>
                    <div className="flex items-center gap-2 text-white/80 hover:text-white transition-colors">
                        <Smartphone size={24} className="text-secondary shrink-0" />
                        <span className="text-xs md:text-sm font-bold whitespace-nowrap">On any device</span>
                    </div>
                       <div className="flex items-center gap-2 text-white/80 hover:text-white transition-colors">
                        <Users size={24} className="text-secondary shrink-0" />
                        <span className="text-xs md:text-sm font-bold whitespace-nowrap">Play with friends</span>
                    </div>
                    <div className="flex items-center gap-2 text-white/80 hover:text-white transition-colors">
                        <Sparkles size={20} className="text-secondary shrink-0" />
                        <span className="text-xs md:text-sm font-bold whitespace-nowrap">All for free</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WelcomeBanner;

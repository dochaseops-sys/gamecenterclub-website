import { Gamepad2 } from 'lucide-react';

const Loader = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-[400px] w-full bg-transparent gap-4">
            <div className="relative">
                {/* Outer glowing ring */}
                <div className="absolute inset-0 rounded-2xl bg-secondary/20 blur-xl animate-pulse"></div>
                
                {/* Logo Container */}
                <div className="relative w-16 h-16 bg-card border border-secondary rounded-2xl flex items-center justify-center shadow-[0_0_30px_rgba(0,243,255,0.2)] animate-bounce">
                    <Gamepad2 className="w-8 h-8 text-secondary" />
                </div>
            </div>
            
            {/* Pulsing bars */}
            <div className="flex gap-1.5 mt-2">
                {[0, 1, 2].map((i) => (
                    <div 
                        key={i} 
                        className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse"
                        style={{ animationDelay: `${i * 0.15}s` }}
                    />
                ))}
            </div>
        </div>
    );
};

export default Loader;

import { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { Link } from 'react-router-dom';
import { Play, ChevronLeft, ChevronRight } from 'lucide-react';
import type { Game } from '../../../types/games.types';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './FeaturedGame.css';

interface FeaturedGameProps {
    games: Game[];
}

const FeaturedGame = ({ games }: FeaturedGameProps) => {
    const [viewMode, setViewMode] = useState<'mobile' | 'tablet' | 'desktop'>('desktop');

    useEffect(() => {
        const checkView = () => {
            const width = window.innerWidth;
            if (width < 431) setViewMode('mobile');
            else if (width < 1023) setViewMode('tablet');
            else setViewMode('desktop');
        };
        checkView();
        window.addEventListener('resize', checkView);
        return () => window.removeEventListener('resize', checkView);
    }, []);

    if (!games || games.length === 0) return null;

    // Chunk games into groups of 9 for the grid layout (Desktop only)
    const chunkedGames = [];
    for (let i = 0; i < games.length; i += 9) {
        chunkedGames.push(games.slice(i, i + 9));
    }

    const isDesktop = viewMode === 'desktop';

    return (
        <section className="relative featured-game-carousel lg:px-0 group/carousel overflow-hidden">
            <Swiper
                modules={[Navigation]}
                spaceBetween={10}
                slidesPerView={1}
                navigation={{
                    prevEl: '.featured-prev',
                    nextEl: '.featured-next',
                }}
                breakpoints={{
                    420: {
                        slidesPerView: isDesktop ? 1 : 1,
                        spaceBetween: 10,
                    },
                    640: {
                        slidesPerView: isDesktop ? 1 : 1,
                        spaceBetween: 10,
                    },
                    768: {
                        slidesPerView: isDesktop ? 1 : 1,
                        spaceBetween: 10,
                    },
                    1024: {
                        slidesPerView: 1,
                        spaceBetween: 10,
                    }
                }}
                className="featured-swiper w-full overflow-hidden"
            >
                {!isDesktop ? (

                    // Mobile & Tablet View: Standard Slider
                    games.map((game) => (
                        <SwiperSlide key={game.id}>
                            <div className="relative w-full  group">
                                {/* Background Image */}
                                <div className="absolute inset-0">
                                    <img
                                        src={game.thumbnail || "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}
                                        alt={game.name}
                                        className="w-full h-full  transition-transform duration-1000 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                                </div>

                                {/* Content */}
                                <div className="absolute bottom-0 left-0 p-8 lg:p-12 max-w-2xl z-10">

                                    <h1 className="text-3xl lg:text-4xl font-display font-black text-white mb-2 drop-shadow-xl uppercase tracking-tighter">
                                        {game.name}
                                    </h1>
                                    <div className="flex gap-4">
                                        <Link to={`/game/${game.id}`}>
                                            <button className="flex items-center h-12 px-8 text-sm bg-secondary text-black font-bold uppercase transition-all duration-300 rounded-3xl hover:shadow-[0_0_15px_#00f3ff] hover:scale-105">
                                                <Play fill='currentColor' size={15} className='mr-1' />
                                                <span>Play Now</span>
                                            </button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))
                ) : (
                    // Desktop View: 9-game Grid
                    chunkedGames.map((group, groupIndex) => (
                        <SwiperSlide key={groupIndex}>
                            <div className="grid grid-cols-6 grid-rows-2 gap-2 w-full h-[430px]">
                                {group.map((game, index) => {
                                    const isBig = index === 2;
                                    return (
                                        <Link
                                            key={game.id}
                                            to={`/game/${game.id}`}
                                            className={`block h-full ${isBig ? 'col-span-2 row-span-2' : ''}`}
                                        >
                                            <div className={`relative w-full h-full rounded-xl overflow-hidden group shadow-2xl transition-all duration-500  lg:hover:-translate-y-1 card-wrapper ${isBig ? 'featured-big-card' : ''}`}>
                                                <div className="absolute inset-0">
                                                    <img
                                                        src={game.thumbnail || "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=1170&auto=format&fit=crop"}
                                                        alt={game.name}
                                                        className={`absolute inset-0 w-full h-full object-cover transition-all duration-1000 group-hover:scale-110 ${game.gif ? 'group-hover:opacity-0' : 'opacity-100'}`}
                                                    />
                                                    {game.gif && (
                                                        <img
                                                            src={game.gif}
                                                            alt={`${game.name} preview`}
                                                            className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-500 scale-110"
                                                        />
                                                    )}
                                                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300 z-10" />
                                                </div>
                                                {index === 0 && (
                                                    <div className="absolute top-2 left-2 z-30 bg-red-600 text-white text-[10px] font-bold px-2 py-1 rounded-md flex items-center gap-1 shadow-lg border border-white/10">
                                                        <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></span> HOT
                                                    </div>
                                                )}

                                                <div className="absolute bottom-0 left-0 right-0 p-4 z-20 transform group-hover:translate-y-[-4px] transition-transform duration-300">
                                                    <h3 className={`${isBig ? 'text-2xl' : 'text-sm'} font-display font-bold text-white drop-shadow-lg line-clamp-2`}>
                                                        {game.name}
                                                    </h3>
                                                    <div className="flex items-center gap-2 mt-2 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                                                        <div className="bg-secondary text-black p-1.5 rounded-lg font-bold">
                                                            <Play fill='currentColor' size={isBig ? 18 : 12} />
                                                        </div>
                                                        <span className={`${isBig ? 'text-xs' : 'text-[9px]'} text-secondary font-black uppercase tracking-widest`}>Play Now</span>
                                                    </div>
                                                </div>
                                                <div className="absolute bottom-0 left-0 w-0 h-[3px] bg-secondary z-30 group-hover:w-full transition-all duration-500" />
                                            </div>
                                        </Link>
                                    );
                                })}
                            </div>
                        </SwiperSlide>
                    ))
                )}
            </Swiper>

            <button className="featured-prev absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-40 bg-black/50 hover:bg-secondary text-white hover:text-black p-3 rounded-full transition-all duration-300 opacity-0 group-hover/carousel:opacity-100 group-hover/carousel:translate-x-2 border border-white/10 shadow-2xl hidden lg:flex">
                <ChevronLeft size={24} />
            </button>
            <button className="featured-next absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-40 bg-black/50 hover:bg-secondary text-white hover:text-black p-3 rounded-full transition-all duration-300 opacity-0 group-hover/carousel:opacity-100 group-hover/carousel:-translate-x-2 border border-white/10 shadow-2xl hidden lg:flex">
                <ChevronRight size={24} />
            </button>
        </section>
    );
};

export default FeaturedGame;

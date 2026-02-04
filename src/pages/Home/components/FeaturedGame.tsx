import { Play, Heart, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import type { Game } from '../../../types/games.types';

import 'swiper/css';
import 'swiper/css/pagination';
import './FeaturedGame.css';

interface FeaturedGameProps {
    games: Game[];
}

const FeaturedGame = ({ games }: FeaturedGameProps) => {
    if (!games || games.length === 0) return null;

    return (
        <section className="relative mb-10 rounded-xl overflow-hidden shadow-[0_0_8px_var(--border)] featured-game-carousel">
            <Swiper
                modules={[Autoplay, Pagination]}
                spaceBetween={0}
                slidesPerView={1}
                autoplay={{
                    delay: 5000,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                    dynamicBullets: true,
                }}
                className="h-96 lg:h-[400px]"
            >
                {games.map((game) => (
                    <SwiperSlide key={game.id}>
                        <div className="relative w-full h-full group">
                            {/* Background Image */}
                            <div className="absolute inset-0">
                                <img
                                    src={game.thumbnail || "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}
                                    alt={game.name}
                                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                            </div>

                            {/* Content */}
                            <div className="absolute bottom-0 left-0 p-8 lg:p-12 max-w-2xl z-10">
                                <p className="mb-4 w-fit px-3 py-1 text-xxs font-extrabold uppercase rounded-sm bg-secondary text-black">
                                    Featured Game
                                </p>
                                <h1 className="text-3xl lg:text-4xl font-display font-black text-white mb-2 drop-shadow-xl uppercase tracking-tighter">
                                    {game.name}
                                </h1>
                                <div className="flex items-center gap-4 mb-4">
                                    <div className='flex items-center gap-1 text-secondary'>
                                        <Star size={14} fill='currentColor' />
                                        <span className='text-xs font-bold'>4.8</span>
                                    </div>
                                    <span className='text-muted-foreground text-xs'>Action • Adventure</span>
                                </div>
                                <p className="text-muted-foreground text-xs mb-8 line-clamp-2 max-w-xl">
                                    {game.description}
                                </p>
                                <div className="flex gap-4">
                                    <Link to={`/game/${game.id}`}>
                                        <button className="flex items-center h-12 px-8 text-sm bg-secondary text-black font-bold uppercase transition-all duration-300 rounded-3xl hover:shadow-[0_0_15px_#00f3ff] hover:scale-105">
                                            <Play fill='currentColor' size={15} className='mr-1' />
                                            <span>Play Now</span>
                                        </button>
                                    </Link>
                                    <button className="text-white px-4 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full transition-colors">
                                        <Heart />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>
    )
}

export default FeaturedGame;

import { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Grid, Navigation, Autoplay } from 'swiper/modules';
import type { Game } from '../../../types/games.types';
import GameCard from '../../../components/gameCard/GameCard';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/grid';
import 'swiper/css/navigation';
import './GameGridCarousel.css';

interface GameGridCarouselProps {
    games: Game[];
    title?: string;
}

const GameGridCarousel = ({ games, title = "Trending Now" }: GameGridCarouselProps) => {
    const prevRef = useRef<HTMLButtonElement>(null);
    const nextRef = useRef<HTMLButtonElement>(null);

    if (!games || games.length === 0) return null;

    return (
        <div className="game-grid-carousel-wrapper relative group/carousel">
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold text-white uppercase tracking-wider">{title}</h2>
            </div>

            <div className="relative">
                <Swiper
                    modules={[Grid, Navigation, Autoplay]}
                    grid={{
                        rows: 2,
                        fill: 'row'
                    }}
                    spaceBetween={2}
                    slidesPerView={3}
                    slidesPerGroup={3}
                    navigation={{
                        prevEl: prevRef.current,
                        nextEl: nextRef.current,
                    }}
                    onBeforeInit={(swiper) => {
                        // @ts-ignore
                        swiper.params.navigation.prevEl = prevRef.current;
                        // @ts-ignore
                        swiper.params.navigation.nextEl = nextRef.current;
                    }}
                    breakpoints={{
                        768: {
                            slidesPerView: 6,
                            slidesPerGroup: 6,
                            grid: { rows: 2, fill: 'row' }
                        },
                        1024: {
                            slidesPerView: 8,
                            slidesPerGroup: 8,
                            grid: { rows: 2, fill: 'row' }
                        }
                    }}
                    loop={false} // Grid and Loop don't work well together in Swiper, but user asked for "repet" which we can handle via long data or loop if possible. 
                    // Actually, for Grid 2 rows, 'loop' is buggy in Swiper. We'll stick to a smooth experience.
                    className="mySwiper"
                >
                    {games.map((game) => (
                        <SwiperSlide key={game.id} className="mt-2">
                            <GameCard
                                id={game.id}
                                title={game.name}
                                thumbnail={game.thumbnail}
                                gif={game.gif || undefined}
                                plays={game.playCount?.toString()}
                                categories={game.categories}
                                showDetails={true}
                                mobileSupport={game.mobileSupport}
                                multiplayer={game.multiplayer}
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>

                {/* Left/Right Buttons */}
                <button
                    ref={prevRef}
                    className="absolute left-0 top-1/2 -translate-y-1/2 z-10  rounded-full bg-black/60 hover:bg-secondary text-white transition-all duration-300 shadow-xl opacity-0 group-hover/carousel:opacity-100"
                >
                    <ChevronLeft size={24} />
                </button>
                <button
                    ref={nextRef}
                    className="absolute right-0 top-1/2 -translate-y-1/2 z-10  rounded-full bg-black/60 hover:bg-secondary text-white transition-all duration-300 shadow-xl opacity-0 group-hover/carousel:opacity-100"
                >
                    <ChevronRight size={24} />
                </button>
            </div>
        </div>
    );
};

export default GameGridCarousel;

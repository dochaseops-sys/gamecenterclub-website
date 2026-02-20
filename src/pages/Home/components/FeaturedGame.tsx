import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import { Link } from 'react-router-dom';
import { Play, ChevronLeft, ChevronRight } from 'lucide-react';
import type { Game } from '../../../types/games.types';

import 'swiper/css';
import 'swiper/css/navigation';
import './FeaturedGame.css';

interface FeaturedGameProps {
  games: Game[];
}

const FeaturedGame = ({ games }: FeaturedGameProps) => {
  if (!games?.length) return null;

  return (
    <section className="relative featured-wrapper group overflow-hidden">
      <Swiper
        modules={[Navigation, Autoplay]}
        slidesPerView={1}
        spaceBetween={20}
        autoplay={{ delay: 4000 }}
        navigation={{
          prevEl: '.featured-prev',
          nextEl: '.featured-next',
        }}
        breakpoints={{
          1024: {
            slidesPerView: 2,
          },
        }}
        className="w-full"
      >
        {games.map((game) => (
          <SwiperSlide key={game.id}>
            <Link to={`/game/${game.id}`}>
              <div className="relative h-[380px] rounded-2xl overflow-hidden group/card cursor-pointer">

                {/* Thumbnail */}
                <img
                  src={game.thumbnail}
                  alt={game.name}
                  className="absolute inset-0 w-full h-full object-cover 
                             transition-all duration-700 
                             group-hover/card:scale-110 
                             group-hover/card:opacity-0"
                />

                {/* GIF Preview */}
                {game.gif && (
                  <img
                    src={game.gif}
                    alt={`${game.name} preview`}
                    className="absolute inset-0 w-full h-full object-cover 
                               opacity-0 
                               group-hover/card:opacity-100 
                               transition-opacity duration-500"
                  />
                )}

                {/* Dark Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t 
                                from-black via-black/50 to-transparent 
                                opacity-80 group-hover/card:opacity-90 
                                transition-all duration-500" />

                {/* Content */}
                <div className="absolute bottom-0 left-0 p-6 z-10 
                                transform transition-all duration-500
                                group-hover/card:-translate-y-3">

                  <h2 className="text-3xl font-bold text-white mb-3 drop-shadow-lg">
                    {game.name}
                  </h2>

                  <div className="flex items-center gap-3 
                                  opacity-0 translate-y-4
                                  group-hover/card:opacity-100 
                                  group-hover/card:translate-y-0 
                                  transition-all duration-500">

                    <div className="bg-secondary p-3 rounded-full shadow-lg">
                      <Play fill="black" size={18} />
                    </div>

                    <span className="text-white uppercase font-semibold tracking-wide">
                      Play Now
                    </span>
                  </div>
                </div>

              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Navigation Buttons */}
      <button className="featured-prev absolute left-4 top-1/2 -translate-y-1/2 z-20 
                         bg-black/60 hover:bg-secondary text-white 
                         p-3 rounded-full hidden lg:flex transition-all duration-300">
        <ChevronLeft size={22} />
      </button>

      <button className="featured-next absolute right-4 top-1/2 -translate-y-1/2 z-20 
                         bg-black/60 hover:bg-secondary text-white 
                         p-3 rounded-full hidden lg:flex transition-all duration-300">
        <ChevronRight size={22} />
      </button>
    </section>
  );
};

export default FeaturedGame;
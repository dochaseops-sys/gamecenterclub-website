import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Play, ChevronLeft, ChevronRight } from 'lucide-react';
import type { Game } from '../../../types/games.types';
import { generateGameUrl } from '../../../utils/string.utils';

import './FeaturedGame.css';

interface FeaturedGameProps {
  games: Game[];
}

const FeaturedGame = ({ games }: FeaturedGameProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleNext = useCallback(() => {
    if (isAnimating || !games?.length) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev + 1) % games.length);
    setTimeout(() => setIsAnimating(false), 1200);
  }, [games?.length, isAnimating]);

  const handlePrev = useCallback(() => {
    if (isAnimating || !games?.length) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev - 1 + games.length) % games.length);
    setTimeout(() => setIsAnimating(false), 1200);
  }, [games?.length, isAnimating]);

  useEffect(() => {
    if (!games?.length) return;
    const timer = setInterval(handleNext, 4000);
    return () => clearInterval(timer);
  }, [handleNext, games?.length]);

  if (!games?.length) return null;

  // Define the 14 positions for the symmetric mirror layout (10:3 aspect ratio)
  const visibleItems = [
    { game: games[currentIndex], pos: 'featured-l' },
    { game: games[(currentIndex + 1) % games.length], pos: 'featured-r' },
    // Left Inner Grid
    { game: games[(currentIndex + 2) % games.length], pos: 'left-in-1' },
    { game: games[(currentIndex + 3) % games.length], pos: 'left-in-2' },
    { game: games[(currentIndex + 4) % games.length], pos: 'left-in-3' },
    // Left Outer Grid
    { game: games[(currentIndex + 5) % games.length], pos: 'left-out-1' },
    { game: games[(currentIndex + 6) % games.length], pos: 'left-out-2' },
    { game: games[(currentIndex + 7) % games.length], pos: 'left-out-3' },
    // Right Inner Grid
    { game: games[(currentIndex + 8) % games.length], pos: 'right-in-1' },
    { game: games[(currentIndex + 9) % games.length], pos: 'right-in-2' },
    { game: games[(currentIndex + 10) % games.length], pos: 'right-in-3' },
    // Right Outer Grid
    { game: games[(currentIndex + 11) % games.length], pos: 'right-out-1' },
    { game: games[(currentIndex + 12) % games.length], pos: 'right-out-2' },
    { game: games[(currentIndex + 13) % games.length], pos: 'right-out-3' },
  ];

  return (
    <section className="relative featured-wrapper group overflow-hidden ">
      <div className="carousel-container relative">
        {visibleItems.map((item) => (
          <div
            key={item.game.id}
            className={`absolute overflow-hidden group/card cursor-pointer transition-all duration-800 ease-[cubic-bezier(0.4,0,0.2,1)] ${item.pos}`}
            style={{ zIndex: item.pos === 'featured' ? 20 : 10 }}
          >
            <Link to={generateGameUrl(item.game.name, item.game.id)} className="block h-full w-full">
              <GameCard game={item.game} isMain={item.pos.startsWith('featured')} />
            </Link>
          </div>
        ))}
      </div>

      {/* Navigation Buttons */}
      <div className="absolute inset-0 pointer-events-none z-30">
        <button
          onClick={handlePrev}
          className="featured-prev absolute left-4 top-1/2 -translate-y-1/2 pointer-events-auto
                     bg-black/60 hover:bg-secondary text-white 
                     p-2 rounded-full hidden lg:flex transition-all duration-300 shadow-xl"
        >
          <ChevronLeft size={18} />
        </button>

        <button
          onClick={handleNext}
          className="featured-next absolute right-4 top-1/2 -translate-y-1/2 pointer-events-auto
                     bg-black/60 hover:bg-secondary text-white 
                     p-2 rounded-full hidden lg:flex transition-all duration-300 shadow-xl"
        >
          <ChevronRight size={18} />
        </button>
      </div>
    </section>
  );
};

const GameCard = ({ game, isMain = false }: { game: Game; isMain?: boolean }) => (
  <>
    {/* Thumbnail */}
    <img
      src={game.thumbnail}
      alt={game.name}
      className="absolute inset-0 w-full h-full object-cover 
                 transition-all duration-700 
                 scale-100
                 group-hover/card:scale-105 
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
                    from-black via-black/40 to-transparent 
                    opacity-60 group-hover/card:opacity-90 
                    transition-all duration-500" />

    {/* Content */}
    <div className={`absolute bottom-0 left-0 right-0 z-10 w-full flex flex-col justify-end
                    transform transition-transform duration-500
                    ${isMain ? 'p-6 translate-y-12 group-hover/card:-translate-y-2' : 'p-2 group-hover/card:-translate-y-1'}`}>

      <h2 className={`${isMain ? 'text-3xl' : 'text-[11px]'} font-bold text-white mb-1 drop-shadow-lg line-clamp-2 leading-tight ${!isMain && 'text-center w-full'}`}>
        {game.name}
      </h2>

      {isMain && (
        <div className="flex items-center gap-2 
                        opacity-0
                        group-hover/card:opacity-100 
                        transition-opacity duration-500 delay-75 mt-1">
          <div className="bg-secondary p-2 rounded-full shadow-lg">
            <Play fill="black" size={14} />
          </div>
          <span className="text-white uppercase font-bold tracking-wider text-xs shadow-black drop-shadow-md">
            Play Now
          </span>
        </div>
      )}
    </div>
  </>
);

export default FeaturedGame;

import { StepForward } from 'lucide-react'
import GameCard from '../components/gameCard/GameCard';
import type { Game } from '../types/games.types';
import { useLocation } from 'react-router-dom';

interface Props {
    games: Game[];
    title?: string;
    showDetails?: boolean;
}

const SectionWrapper = ({ games, title, showDetails }: Props) => {
    const location = useLocation();
    const isAdPage = location.pathname !== "/";



    const gridClasses = isAdPage
        ? "grid grid-cols-3 md:grid-cols-4 xl:grid-cols-6 gap-1"
        : "grid grid-cols-3 sm:grid-cols-6 lg:grid-cols-8 xl:grid-cols-8 gap-1";

    return (
        <section className="">
            {title && <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <div className=" bg-secondary/10 rounded-sm">
                        <StepForward className="w-5 text-secondary" />
                    </div>
                    <h2 className="text-xl text-white font-display">{title}</h2>
                </div>
            </div>}
            <div className={gridClasses}>
                {games?.map((game) => (
                    <GameCard
                        key={game.id}
                        id={game.id}    
                        title={game?.name}
                        thumbnail={game?.thumbnail}
                        gif={game.gif || undefined}
                        showDetails={showDetails}
                        plays={game.playCount ? String(game?.playCount) : undefined}
                        mobileSupport={game?.mobileSupport}
                        multiplayer={game?.multiplayer}
                        categories={game?.categories}
                    />
                ))} 
                {(!games || games.length === 0) && (
                    <div className="col-span-full text-center py-12 text-muted-foreground">
                        No games found.
                    </div>
                )}
            </div>
        </section>
    )
}

export default SectionWrapper

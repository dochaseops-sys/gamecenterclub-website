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
        ? "grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6"
        : "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6";

    return (
        <section className="mb-7">
            {title && <div className="flex justify-between items-center mb-3">
                <div className="flex items-center gap-2">
                    <div className="p-2 bg-secondary/10 rounded-lg">
                        <StepForward className="w-5 h-5 text-secondary" />
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

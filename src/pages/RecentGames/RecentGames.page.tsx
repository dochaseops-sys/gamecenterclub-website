import { useState, useEffect, useRef, useCallback } from "react";
import { useGetRecentGamesQuery } from "../../services/redux/apis/games";
import AppWrapper from "../../HOC/AppWrapper";
import SectionWrapper from "../../HOC/SectionWrapper";
import { Loader2, History, Clock, Gamepad2 } from "lucide-react";
import type { RecentGame } from "../../types/games.types";

const RecentGames = () => {
    const [page, setPage] = useState(1);
    const [allGames, setAllGames] = useState<RecentGame[]>([]);
    const [hasMore, setHasMore] = useState(true);

    const { data: response, isLoading, isFetching } = useGetRecentGamesQuery({ page, limit: 12 });

    const observer = useRef<IntersectionObserver | null>(null);
    const lastGameElementRef = useCallback((node: HTMLDivElement | null) => {
        if (isLoading || isFetching) return;
        if (observer.current) observer.current.disconnect();
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasMore) {
                setPage(prev => prev + 1);
            }
        });
        if (node) observer.current.observe(node);
    }, [isLoading, isFetching, hasMore]);

    useEffect(() => {
        if (response?.data) {
            setAllGames(prev => {
                // Avoid duplicates based on unique ID combined with game ID potentially, 
                // but simpler to just filter by ID if we assume ID is unique.
                const newGames = response.data.filter(g => !prev.some(p => p.id === g.id));
                return [...prev, ...newGames];
            });

            if (response.pagination) {
                setHasMore(response.pagination.currentPage < response.pagination.totalPages);
            } else {
                // Fallback if pagination missing (backward compatibility or error)
                setHasMore(response.data.length === 12);
            }
        }
    }, [response]);

    const showInitialLoader = isLoading && allGames.length === 0;

    return (
        <AppWrapper>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div className="flex items-center gap-4">
                    <div className="p-4 bg-[var(--secondary)]/10 rounded-2xl border border-[var(--secondary)]/20 shadow-[0_0_20px_rgba(0,243,255,0.1)]">
                        <History className="w-8 h-8 text-[var(--secondary)]" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-display font-bold text-white tracking-tight">Recently Played</h1>
                        <p className="text-muted-foreground flex items-center gap-2 mt-1">
                            <Clock className="w-4 h-4" />
                            Jump back into your last adventures
                        </p>
                    </div>
                </div>

                {allGames.length > 0 && (
                    <div className="px-4 py-2 bg-white/5 rounded-xl border border-white/10 hidden md:block">
                        <span className="text-sm text-muted-foreground"> Total Sessions: </span>
                        <span className="text-sm font-bold text-white">
                            {allGames.reduce((acc: number, game: RecentGame) => acc + (game.playCount || 0), 0)}
                        </span>
                    </div>
                )}
            </div>

            {showInitialLoader ? (
                <div className="flex items-center justify-center min-h-[400px]">
                    <div className="flex flex-col items-center gap-4">
                        <div className="relative">
                            <Loader2 className="w-12 h-12 animate-spin text-[var(--secondary)]" />
                            <div className="absolute inset-0 blur-lg bg-[var(--secondary)]/20 animate-pulse" />
                        </div>
                        <p className="text-muted-foreground font-medium animate-pulse tracking-wide italic">Retrieving your gaming history...</p>
                    </div>
                </div>
            ) : allGames.length > 0 ? (
                <div className="space-y-12">
                    <SectionWrapper
                        title="Continue Playing"
                        games={allGames.map((item: RecentGame) => item.Game)}
                        showDetails={true}
                    />

                    {/* Sentinel for infinite scroll */}
                    <div ref={lastGameElementRef} className="h-10 w-full flex justify-center items-center">
                        {isFetching && (
                            <Loader2 className="w-6 h-6 animate-spin text-[var(--secondary)]" />
                        )}
                    </div>
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center min-h-[500px] text-center p-12 bg-card/30 rounded-[2rem] border border-border/50 backdrop-blur-sm relative overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[var(--secondary)]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                    <div className="relative">
                        <div className="w-24 h-24 bg-muted/20 rounded-full flex items-center justify-center mb-6 ring-1 ring-white/10 shadow-2xl">
                            <Gamepad2 className="w-12 h-12 text-muted-foreground/60" />
                        </div>
                        <h3 className="text-2xl font-display font-bold mb-3 text-white">Your History is Empty</h3>
                        <p className="text-muted-foreground max-w-sm mx-auto leading-relaxed">
                            It looks like you haven't played any games yet.
                            The more you play, the better your personal history becomes!
                        </p>
                        <button
                            onClick={() => window.location.href = '/'}
                            className="mt-8 px-8 py-3 bg-[var(--secondary)] text-primary font-bold rounded-xl shadow-[0_4px_20px_rgba(0,243,255,0.4)] hover:shadow-[0_8px_30px_rgba(0,243,255,0.6)] hover:scale-105 active:scale-95 transition-all duration-300"
                        >
                            Explore Games
                        </button>
                    </div>
                </div>
            )
            }
        </AppWrapper >
    );
};

export default RecentGames;

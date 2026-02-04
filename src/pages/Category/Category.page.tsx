import { useParams } from "react-router-dom";
import { useState, useEffect, useRef, useCallback } from "react";
import AppWrapper from "../../HOC/AppWrapper";
import SectionWrapper from "../../HOC/SectionWrapper";
import { useGetGamesByCategoryQuery, useGetCategoriesQuery, useGetTrendingGamesQuery, useGetMostEngagingGamesQuery } from "../../services/redux/apis/games";
import type { Game } from "../../types/games.types";
import Loader from "../../loader/Loader";
import { Loader2 } from "lucide-react";

const CategoryPage = () => {
    const { id } = useParams<{ id: string }>();
    const categoryId = Number(id);

    const [page, setPage] = useState(1);
    const [allGames, setAllGames] = useState<Game[]>([]);
    const [hasMore, setHasMore] = useState(true);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [categoryId]);

    const { data: categories = [] } = useGetCategoriesQuery();
    const category = categories.find(c => c.id === categoryId);

    const isTrending = category?.title === "Trending";
    const isMostEngaging = category?.title === "Most Engaging";

    // Queries
    const { data: categoryResponse, isLoading: isCategoryLoading, isFetching: isCategoryFetching } = useGetGamesByCategoryQuery(
        { categoryId, page, limit: 12 },
        { skip: !categoryId || isTrending || isMostEngaging }
    );

    const { data: trendingResponse, isLoading: isTrendingLoading, isFetching: isTrendingFetching } = useGetTrendingGamesQuery(
        { page, limit: 12 },
        { skip: !isTrending }
    );

    const { data: engagingResponse, isLoading: isEngagingLoading, isFetching: isEngagingFetching } = useGetMostEngagingGamesQuery(
        { page, limit: 12 },
        { skip: !isMostEngaging }
    );

    const currentResponse = isTrending ? trendingResponse : (isMostEngaging ? engagingResponse : categoryResponse);
    const isLoading = isCategoryLoading || isTrendingLoading || isEngagingLoading;
    const isFetching = isCategoryFetching || isTrendingFetching || isEngagingFetching;

    // Reset state when category changes
    useEffect(() => {
        setPage(1);
        setAllGames([]);
        setHasMore(true);
    }, [categoryId]);

    // Accumulate games
    useEffect(() => {
        if (currentResponse?.data) {
            setAllGames(prev => {
                const newGames = currentResponse.data.filter(g => !prev.some(p => p.id === g.id));
                return [...prev, ...newGames];
            });

            if (currentResponse.pagination?.totalPages) {
                setHasMore(page < currentResponse.pagination.totalPages);
            } else {
                setHasMore(currentResponse.data.length === 12);
            }
        }
    }, [currentResponse, page]);

    // Intersection Observer for infinite scroll
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

    return (
        <AppWrapper>
            <div className="flex flex-col min-h-screen">
                <div className="mb-8 mt-4">
                    <h1 className="text-3xl font-display font-bold text-white mb-2">
                        {category ? category.title : ""} Games
                    </h1>
                    <p className="text-muted-foreground">
                        {isLoading ? "" : `Found ${allGames.length} games`}
                    </p>
                </div>

                {isLoading && allGames.length === 0 ? (
                    <div className="flex-1 flex items-center justify-center min-h-[400px]">
                        <Loader />
                    </div>
                ) : (
                    <div className="space-y-12">
                        <SectionWrapper games={allGames} showDetails />

                        {/* Sentinel for infinite scroll */}
                        <div ref={lastGameElementRef} className="h-10 w-full flex justify-center items-center pb-8">
                            {isFetching && (
                                <Loader2 className="w-8 h-8 animate-spin text-secondary" />
                            )}
                        </div>
                    </div>
                )}
            </div>
        </AppWrapper>
    );
};

export default CategoryPage;

import { useParams, useLocation } from "react-router-dom";
import { useState, useEffect, useRef, useCallback } from "react";
import AppWrapper from "../../HOC/AppWrapper";
import SectionWrapper from "../../HOC/SectionWrapper";
import {
    useGetGamesByCategoryQuery,
    useGetCategoriesQuery,
    useGetTrendingGamesQuery,
    useGetMostEngagingGamesQuery,
    useGetNewGamesQuery
} from "../../services/redux/apis/games";
import type { Game } from "../../types/games.types";
import Loader from "../../loader/Loader";
import { Loader2 } from "lucide-react";
import { slugify, unslugify } from "../../utils/string.utils";
import SEO from "../../components/SEO/SEO";

const CategoryPage = () => {
    const { slug } = useParams<{ slug?: string }>();
    const location = useLocation();

    const [page, setPage] = useState(1);
    const [allGames, setAllGames] = useState<Game[]>([]);
    const [hasMore, setHasMore] = useState(true);

    const { data: categories = [] } = useGetCategoriesQuery();

    // Determine current category/section
    const pathname = location.pathname;
    const isTrending = pathname.includes('/trending');
    const isMostEngaging = pathname.includes('/most-engaging');
    const isNewGames = pathname.includes('/new-games');

    // Find category by ID or slug
    const category = categories.find(c =>
        (slug && !isNaN(Number(slug)) && c.id === Number(slug)) ||
        (slug && slugify(c.title || "") === slug)
    );

    const categoryId = category?.id;
    const displayTitle = isTrending ? "Trending" :
        isMostEngaging ? "Most Engaging" :
            isNewGames ? "New" :
                category ? category.title :
                    (slug ? unslugify(slug) : "");

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [categoryId, pathname]);

    const commonParams = { page, limit: 12 };

    const { data: categoryResponse, isLoading: isCategoryLoading, isFetching: isCategoryFetching } = useGetGamesByCategoryQuery(
        { categoryId: categoryId || 0, ...commonParams },
        { skip: !categoryId || isTrending || isMostEngaging || isNewGames }
    );

    const { data: trendingResponse, isLoading: isTrendingLoading, isFetching: isTrendingFetching } = useGetTrendingGamesQuery(
        commonParams,
        { skip: !isTrending }
    );

    const { data: engagingResponse, isLoading: isEngagingLoading, isFetching: isEngagingFetching } = useGetMostEngagingGamesQuery(
        commonParams,
        { skip: !isMostEngaging }
    );

    const { data: newResponse, isLoading: isNewLoading, isFetching: isNewFetching } = useGetNewGamesQuery(
        commonParams,
        { skip: !isNewGames }
    );

    const currentResponse = isTrending ? trendingResponse :
        (isMostEngaging ? engagingResponse :
            (isNewGames ? newResponse : categoryResponse));

    const isLoading = isCategoryLoading || isTrendingLoading || isEngagingLoading || isNewLoading;
    const isFetching = isCategoryFetching || isTrendingFetching || isEngagingFetching || isNewFetching;

    useEffect(() => {
        setPage(1);
        setAllGames([]);
        setHasMore(true);
    }, [categoryId, pathname]);

    useEffect(() => {
        if (currentResponse?.data) {
            setAllGames(prev => {
                const newGames = currentResponse.data.filter((g: Game) => !prev.some(p => p.id === g.id));
                return [...prev, ...newGames];
            });

            if (currentResponse.pagination?.totalPages) {
                setHasMore(page < currentResponse.pagination.totalPages);
            } else {
                setHasMore(currentResponse.data.length === 12);
            }
        }
    }, [currentResponse, page]);

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
            <SEO
                title={`${displayTitle} Games`}
                description={`Play the best ${displayTitle} games online for free at GameCenter Club.`}
            />
            <div className="flex flex-col min-h-screen">
                <div className="mb-8 mt-4">
                    <h1 className="text-3xl font-display font-bold text-white mb-2">
                        {displayTitle} Games
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

import { useState, useRef, useEffect, useCallback } from "react";
// import Category from "../../components/category/Category";
import AppWrapper from "../../HOC/AppWrapper";
import SectionWrapper from "../../HOC/SectionWrapper";
import FeaturedGame from "./components/FeaturedGame";
import GameGridCarousel from "./components/GameGridCarousel";
// import WelcomeBanner from "./components/WelcomeBanner";
import { useGetCategoriesQuery, useGetGamesQuery /*, useGetNewGamesQuery*/ } from "../../services/redux/apis/games";
import type { Game } from "../../types/games.types";
import { Loader2 } from "lucide-react";

const Home = () => {
  const [selectedCat/*, setSelectedCat*/] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [gamesList, setGamesList] = useState<Game[]>([]);

  const { data: categories = [] } = useGetCategoriesQuery();
  const { data: gamesResponse, isFetching, isLoading } = useGetGamesQuery({ categoryId: selectedCat || undefined, page, limit: 20 });
  // const { data: newGamesResponse } = useGetNewGamesQuery();
  // const newGames: Game[] = newGamesResponse?.data || [];

  const totalPages = gamesResponse?.pagination?.totalPages || 1;
  const hasMore = page < totalPages;

  // Reset state when category changes
  useEffect(() => {
    setPage(1);
    setGamesList([]);
  }, [selectedCat]);

  // Update accumulated list when data arrives
  useEffect(() => {
    if (gamesResponse?.data) {
      if (page === 1) {
        setGamesList(gamesResponse.data);
      } else {
        setGamesList(prev => {
          const newGames = gamesResponse.data.filter(
            (newGame: any) => !prev.some(existingGame => existingGame.id === newGame.id)
          );
          return [...prev, ...newGames];
        });
      }
    }
  }, [gamesResponse, page]);

  // Intersection Observer for Infinite Scroll
  const observer = useRef<IntersectionObserver | null>(null);
  const lastElementRef = useCallback((node: HTMLDivElement | null) => {
    if (isLoading || isFetching) return;
    if (observer.current) observer.current.disconnect();

    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore && !isFetching) {
        console.log("Loading more games... current page:", page);
        setPage(prev => prev + 1);
      }
    }, { threshold: 0.1, rootMargin: '100px' });

    if (node) observer.current.observe(node);
  }, [isLoading, isFetching, hasMore, page]);

  // const externalCategories = categories.filter(c => c.type === 'external');

  return <AppWrapper>
    <div className="flex flex-col">
      {/* Welcome Banner */}
      {/* <WelcomeBanner /> */}

      {/* featured Game */}
      <FeaturedGame games={gamesList} />

      <GameGridCarousel games={gamesList} title="" />


      {/* Categories */}
      {/* <div className="flex gap-x-5 mb-7 overflow-x-auto custom-scrollbar pb-2">
        <Category
          title={"All Games"}
          selected={selectedCat === null}
          onClick={() => setSelectedCat(null)}
        />
        {
          externalCategories.map(c => (
            <Category
              key={c.id}
              title={c.title}
              selected={selectedCat === c.id.toString()}
              onClick={() => setSelectedCat(c.id.toString())}
            />
          ))
        }
      </div> */}

      {/* New Games */}
      {/* {!selectedCat && newGames.length > 0 && (
          <SectionWrapper games={newGames} title="New Games" />
        )} */}

      {/* All games */}
      <SectionWrapper games={gamesList} title={selectedCat ? categories.find(c => c.id.toString() === selectedCat)?.title || "Games" : "All Games"} />

      {/* Loading Indicator for Infinite Scroll */}
      <div ref={lastElementRef} className="flex justify-center py-8 h-20 w-full mb-10">
        {isFetching && (
          <Loader2 className="w-8 h-8 animate-spin text-secondary" />
        )}
        {!hasMore && gamesList.length > 0 && (
          <p className="text-sm text-muted-foreground">No more games to show</p>
        )}
      </div>
    </div>
  </AppWrapper>
}

export default Home

import { useState, useRef, useEffect } from "react";
import Category from "../../components/category/Category";
import AppWrapper from "../../HOC/AppWrapper";
import SectionWrapper from "../../HOC/SectionWrapper";
import FeaturedGame from "./components/FeaturedGame";
import { useGetCategoriesQuery, useGetGamesQuery, useGetNewGamesQuery } from "../../services/redux/apis/games";

const Home = () => {
  const [selectedCat, setSelectedCat] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [gamesList, setGamesList] = useState<any[]>([]);

  const { data: categories = [] } = useGetCategoriesQuery();
  const { data: gamesResponse, isFetching } = useGetGamesQuery({ categoryId: selectedCat || undefined, page, limit: 20 });
  const { data: newGames = [] } = useGetNewGamesQuery();

  const totalPages = gamesResponse?.totalPages || 1;
  const observerTarget = useRef<HTMLDivElement>(null);

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
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && !isFetching && page < totalPages) {
          setPage(prev => prev + 1);
        }
      },
      { threshold: 1.0 }
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => {
      if (observerTarget.current) {
        observer.unobserve(observerTarget.current);
      }
    };
  }, [observerTarget, isFetching, page, totalPages]);

  const externalCategories = categories.filter(c => c.type === 'external');

  return <AppWrapper>
    <div className="flex flex-col">
      {/* featured Game */}
      <FeaturedGame games={newGames.slice(0, 5)} />

      {/* Categories */}
      <div className="flex gap-x-5 mb-7 overflow-x-auto custom-scrollbar pb-2">
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
      </div>

      {/* New Games */}
      {!selectedCat && newGames.length > 0 && (
        <SectionWrapper games={newGames} title="New Games" />
      )}

      {/* All games */}
      <SectionWrapper games={gamesList} title={selectedCat ? categories.find(c => c.id.toString() === selectedCat)?.title || "Games" : "All Games"} />

      {/* Loading Indicator for Infinite Scroll */}
      <div ref={observerTarget} className="flex justify-center py-4 h-10 w-full mb-10">
        {isFetching && page > 1 && (
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
        )}
      </div>
    </div>
  </AppWrapper>
}

export default Home

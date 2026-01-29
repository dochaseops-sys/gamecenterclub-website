import { useState } from "react";
import Category from "../../components/category/Category";
import AppWrapper from "../../HOC/AppWrapper";
import SectionWrapper from "../../HOC/SectionWrapper";
import FeaturedGame from "./components/FeaturedGame";
import { useGetCategoriesQuery, useGetGamesQuery, useGetNewGamesQuery } from "../../services/redux/apis/games";

const Home = () => {
  const [selectedCat, setSelectedCat] = useState<string | null>(null);
  const { data: categories = [] } = useGetCategoriesQuery();
  const { data: gamesData } = useGetGamesQuery({ categoryId: selectedCat || undefined });
  const { data: newGames = [] } = useGetNewGamesQuery();
  const games = Array.isArray(gamesData) ? gamesData : (gamesData as any)?.data || [];

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
      <SectionWrapper games={games} title={selectedCat ? categories.find(c => c.id.toString() === selectedCat)?.title || "Games" : "All Games"} />
    </div>
  </AppWrapper>
}

export default Home

import Category from "../../components/category/Category";
import AppWrapper from "../../HOC/AppWrapper";
import SectionWrapper from "../../HOC/SectionWrapper";
import FeaturedGame from "./components/FeaturedGame";
import { useGetCategoriesQuery, useGetGamesQuery } from "../../services/redux/apis/games";

const Home = () => {
  const { data: categories = [] } = useGetCategoriesQuery();
  const { data: games = [] } = useGetGamesQuery();

  return <AppWrapper>
    <div className="flex flex-col">
      {/* featured Game */}
      <FeaturedGame />

      {/* Categories */}
      <div className="flex gap-x-5 mb-7 overflow-x-auto">

        <Category title={"All Games"} selected />
        <Category title={"Most Engaging"} />
        {
          categories.map(c => <Category title={c.title} selected={false} key={c.title} />)
        }
      </div>

      {/* All games */}
      <SectionWrapper games={games} title="All Games" />
    </div>
  </AppWrapper>
}

export default Home

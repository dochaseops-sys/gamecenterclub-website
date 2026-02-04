import { useSearchParams } from "react-router-dom";
import AppWrapper from "../../HOC/AppWrapper";
import SectionWrapper from "../../HOC/SectionWrapper";
import { useSearchGamesQuery } from "../../services/redux/apis/games";
import type { Game } from "../../types/games.types";
import Loader from "../../loader/Loader";

const SearchPage = () => {
    const [searchParams] = useSearchParams();
    const query = searchParams.get("query") || "";

    const { data: searchResponse, isLoading } = useSearchGamesQuery({ query }, {
        skip: !query,
    });
    const games: Game[] = searchResponse?.data || [];

    return (
        <AppWrapper>
            <div className="flex flex-col min-h-screen">
                <div className="mb-8 mt-4">
                    <h1 className="text-3xl font-display font-bold text-white mb-2">
                        Search results for <span className="text-secondary">"{query}"</span>
                    </h1>
                    <p className="text-muted-foreground">
                        {isLoading ? "" : `Found ${games.length} results`}
                    </p>
                </div>

                {isLoading ? (
                    <div className="flex-1 flex items-center justify-center">
                        <Loader />
                    </div>
                ) : (
                    <SectionWrapper games={games} showDetails />
                )}
            </div>
        </AppWrapper>
    );
};

export default SearchPage;

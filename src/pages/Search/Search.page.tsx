import { useSearchParams } from "react-router-dom";
import AppWrapper from "../../HOC/AppWrapper";
import SectionWrapper from "../../HOC/SectionWrapper";
import { useSearchGamesQuery } from "../../services/redux/apis/games";

const SearchPage = () => {
    const [searchParams] = useSearchParams();
    const query = searchParams.get("query") || "";

    const { data: games = [], isLoading } = useSearchGamesQuery(query, {
        skip: !query,
    });

    return (
        <AppWrapper>
            <div className="flex flex-col min-h-screen">
                <div className="mb-8 mt-4">
                    <h1 className="text-3xl font-display font-bold text-white mb-2">
                        Search results for <span className="text-primary">"{query}"</span>
                    </h1>
                    <p className="text-muted-foreground">
                        {isLoading ? "Searching..." : `Found ${games.length} results`}
                    </p>
                </div>

                {isLoading ? (
                    <div className="flex-1 flex items-center justify-center">
                        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                    </div>
                ) : (
                    <SectionWrapper games={games} showDetails />
                )}
            </div>
        </AppWrapper>
    );
};

export default SearchPage;

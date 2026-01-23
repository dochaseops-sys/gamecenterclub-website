import { useParams } from "react-router-dom";
import AppWrapper from "../../HOC/AppWrapper";
import SectionWrapper from "../../HOC/SectionWrapper";
import { useGetGamesByCategoryQuery, useGetCategoriesQuery } from "../../services/redux/apis/games";

const CategoryPage = () => {
    const { id } = useParams<{ id: string }>();
    const categoryId = Number(id);

    const { data: categories = [] } = useGetCategoriesQuery();
    const { data: games = [], isLoading } = useGetGamesByCategoryQuery(categoryId, {
        skip: !categoryId,
    });

    const category = categories.find(c => c.id === categoryId);

    return (
        <AppWrapper>
            <div className="flex flex-col min-h-screen">
                <div className="mb-8 mt-4">
                    <h1 className="text-3xl font-display font-bold text-white mb-2">
                        {category ? category.title : "Category"} Games
                    </h1>
                    <p className="text-muted-foreground">
                        {isLoading ? "Loading games..." : `Found ${games.length} games`}
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

export default CategoryPage;

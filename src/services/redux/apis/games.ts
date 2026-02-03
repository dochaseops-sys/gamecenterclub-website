import { api } from './index';
import type { Category, Game, GetCategoriesResponse, GetGamesResponse, SubmitGameResponse, RecentGame, GetRecentGamesResponse } from '../../../types/games.types';

export const gamesApi = api.injectEndpoints({
    overrideExisting: true,
    endpoints: (build) => ({
        // Submit Game
        submitGame: build.mutation<SubmitGameResponse, FormData>({
            query: (formData) => ({
                url: "games/submit",
                method: "POST",
                body: formData,
            }),
            invalidatesTags: ["Auth"], // Adjust tags as needed, maybe add "Games" later
        }),
        // Get All Games
        getGames: build.query<GetGamesResponse, { categoryId?: string; status?: string; search?: string; page?: number; limit?: number } | void>({
            query: (params) => {
                const searchParams = new URLSearchParams();
                if (params) {
                    if (params.categoryId) searchParams.append('categoryId', params.categoryId);
                    if (params.status) searchParams.append('status', params.status);
                    if (params.search) searchParams.append('search', params.search);
                    if (params.page) searchParams.append('page', params.page.toString());
                    if (params.limit) searchParams.append('limit', params.limit.toString());
                }
                const queryString = searchParams.toString();
                return queryString ? `games?${queryString}` : "games";
            },
            transformResponse: (response: GetGamesResponse) => response,
        }),
        // Get Game by ID
        getGameById: build.query<Game, number>({
            query: (id) => `games/${id}`,
            transformResponse: (response: { success: boolean; data: Game }) => response.data,
        }),
        // Get All Categories
        getCategories: build.query<Category[], void>({
            query: () => "categories",
            transformResponse: (response: GetCategoriesResponse) => response.data,
        }),
        // Get Categories for Dropdown
        getCategoriesForDropdown: build.query<Category[], void>({
            query: () => "categories-for-dropdown",
            transformResponse: (response: GetCategoriesResponse) => response.data,
        }),
        // Search Games
        searchGames: build.query<Game[], string>({
            query: (searchQuery) => `games?search=${encodeURIComponent(searchQuery)}`,
            transformResponse: (response: GetGamesResponse) => response.data,
        }),
        // Get Games by Category
        getGamesByCategory: build.query<Game[], number>({
            query: (categoryId) => `games?categoryId=${categoryId}`,
            transformResponse: (response: GetGamesResponse) => response.data,
        }),

        // Add Game to Recent
        addGameToRecent: build.mutation<void, number>({
            query: (gameId) => ({
                url: `games/${gameId}/play`,
                method: "POST",
            }),
            invalidatesTags: ["RecentGames"],
        }),
        // Get Recent Games
        getRecentGames: build.query<RecentGame[], void>({
            query: () => "games/recent",
            transformResponse: (response: GetRecentGamesResponse) => response.data,
            providesTags: ["RecentGames"],
        }),
        // Get Trending Games
        getTrendingGames: build.query<Game[], void>({
            query: () => "games/trending",
            transformResponse: (response: GetGamesResponse) => response.data,
        }),
        // Get Most Engaging Games
        getMostEngagingGames: build.query<Game[], void>({
            query: () => "games/most-engaging",
            transformResponse: (response: GetGamesResponse) => response.data,
        }),
        // Get New Games
        getNewGames: build.query<Game[], void>({
            query: () => "games/new",
            transformResponse: (response: GetGamesResponse) => response.data,
        }),
    }),
});

export const {
    useSubmitGameMutation,
    useGetCategoriesForDropdownQuery,
    useGetGamesQuery,
    useGetGameByIdQuery,
    useGetCategoriesQuery,
    useSearchGamesQuery,
    useGetGamesByCategoryQuery,
    useAddGameToRecentMutation,
    useGetRecentGamesQuery,
    useGetTrendingGamesQuery,
    useGetMostEngagingGamesQuery,
    useGetNewGamesQuery,
} = gamesApi;

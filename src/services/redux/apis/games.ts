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
        getGames: build.query<Game[], void>({
            query: () => "games",
            transformResponse: (response: GetGamesResponse) => response.data,
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
    }),
});

export const {
    useSubmitGameMutation,
    useGetGamesQuery,
    useGetGameByIdQuery,
    useGetCategoriesQuery,
    useSearchGamesQuery,
    useGetGamesByCategoryQuery,
    useAddGameToRecentMutation,
    useGetRecentGamesQuery,
} = gamesApi;

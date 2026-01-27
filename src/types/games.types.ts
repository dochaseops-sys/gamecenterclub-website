export interface Category {
    id: number;
    title: string;
    description?: string;
    createdAt?: string;
    updatedAt?: string;
}

export interface Game {
    id: number;
    name: string;
    description: string;
    gameEngine: string;
    mobileSupport: boolean;
    multiplayer: boolean;
    categoryId: number;
    thumbnail: string;
    gif: string | null;
    gameFile: string;
    status: string;
    category: Category;
}

export interface Game {
    id: number;
    name: string;
    description: string;
    gameEngine: string;
    gameFile: string;
    thumbnail: string;
    gif: string | null;
    status: string;
    categoryId: number;
    mobileSupport: boolean;
    multiplayer: boolean;
    created_at: string;
    updated_at: string;
}

export interface RecentGame {
    id: number;
    userId: number;
    gameId: number;
    lastPlayedAt: string;
    playCount: number;
    created_at: string;
    updated_at: string;
    Game: Game; // ✅ object, not array
}

export interface SubmitGameResponse {
    success: boolean;
    data: Game;
    message?: string;
}

export interface GetCategoriesResponse {
    success: boolean;
    data: Category[];
}

export interface GetGamesResponse {
    success: boolean;
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    data: Game[];
}
export interface GetRecentGamesResponse {
    success: boolean;
    data: RecentGame[];
}

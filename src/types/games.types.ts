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

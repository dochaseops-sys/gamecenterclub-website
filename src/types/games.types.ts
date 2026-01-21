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
    gameUrl: string;
    gifUrl: string;
    thumbnailUrl: string;
    category: Category | number;
    createdAt: string;
    updatedAt: string;
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
    data: Game[];
}

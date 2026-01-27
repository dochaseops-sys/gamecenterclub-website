export interface User {
    id: string,
    email: string;
    name: string;
    accessToken: string;
    refreshToken: string;
    profile_pic?: string;
}
export interface SignUpRequest {
    name: string;
    email: string;
    password: string;
}

export interface LoginRequest {
    email: string;
    password: string;
}

export interface GoogleLoginRequest {
    code: string;
}


export type ForgotPasswordRequest = Pick<LoginRequest, 'email'>

export interface UpdateProfileRequest {
    name?: string;
    email?: string;
    profile_pic?: string;
    password?: string;
}

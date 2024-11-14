export interface TokenPayload {
    id: number;
    email?: string;
    username: string;
}

export interface TokenPayload {
    id: number;
    email?: string;
    username: string;
}


export interface TokenDecoded {
    id: number;
    iat: number;
    exp: number;
}

export interface JwtTokens {
    refreshToken: string;
    accessToken: string;
}

export interface JwtTokens {
    refreshToken: string;
    accessToken: string;
}
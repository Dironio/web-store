export interface User {
    id: number;
    username: string;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    img: string;
    age: number;
    birthday: Date;
    role_id: number;
    created_at: Date;
    updated_at: Date;
}

export interface CreateUserDto {
    username: string;
    email: string;
    password: string;
    firstName?: string;
    lastName?: string;
    img?: string;
}

export interface GetUserDto {
    id?: number;
    username?: string;
    email?: string;
    password?: string;
    firstName?: string;
    lastName?: string;
    img?: string;
    age?: number;
    birthday?: Date;
    role_id?: number;
    created_at?: Date;
    updated_at?: Date;
}

export interface CreateUserDb {
    username: string
    password: string
}

export interface LoginUserDto {
    username: string
    password: string
}


export interface UpdateUserDto {
    id: number;
    username?: string;
    email?: string;
    password?: string;
    firstName?: string;
    lastName?: string;
    img?: string;
    age?: number;
    birthday?: Date;
    role_id?: number;
    created_at?: Date;
    updated_at?: Date;
}







export interface JwtTokens {
    refreshToken: string;
    accessToken: string;
}

export interface CreateUserDto {
    email: string;
    username: string;
    password: string;
}

export interface LoginUserDto {
    username: string;
    password: string;
}

export interface CreatedUser {
    user: User;
    tokens: JwtTokens;
}

import { JwtTokens } from "./tokenPayLoad";

export interface User {
    id: number;
    username: string;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    img: string;
    age: number;
    gender: string;
    address: string;
    birthday: Date;
    role: string;
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
    age?: number;
    gender?: string;
    address?: string;
    birthday?: Date;
    role_id?: number;
    created_at?: Date;
    updated_at?: Date;
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
    gender?: string;
    address?: string;
    birthday?: Date;
    role_id?: number;
    role: string;
    created_at?: Date;
    updated_at?: Date;
}

export interface CreateUserDb {
    username: string
    password: string
}

export interface LoginUserDto {
    username: string
    // email?: string
    // indentity: string;
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
    gender?: string;
    birthday?: Date;
    role_id?: number;
    created_at?: Date;
    updated_at?: Date;
}

export interface CreatedUser {
    user: User;
    tokens: JwtTokens;
}

export interface CreateUserDto {
    firstName?: string;
    lastName?: string;
    email: string;
    password: string;
    img?: string;
    role?: string;
}

export interface CreateUserDb {
    email: string
    password: string
}

export interface LoginUserDto {
    email: string
    password: string
}

export interface User {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    img: string;
    role: string;
}

export interface UpdateUserDto {
    id: number;
    firstName?: string;
    lastName?: string;
    email?: string;
    password?: string;
    img?: string;
    role?: string;
}
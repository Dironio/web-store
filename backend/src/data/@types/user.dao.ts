export interface CreateUserDao {
    id?: number;
    username: string;
    email: string;
    password: string;
    firstName?: string;
    lastName?: string;
    img?: string;
    age?: number;
    birthday?: Date;
    role_id?: number;
    created_at?: Date;
    updated_at?: Date;
}

export interface GetUserDao {
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

export interface UpdateUserDao {
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
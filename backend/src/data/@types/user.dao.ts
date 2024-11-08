export interface CreateUserDao {
    firstName?: string;
    lastName?: string;
    email: string;
    password: string;
    img?: string;
    role_id?: number;
}

export interface GetUserDao {
    id?: number;
    firstName?: string;
    lastName?: string;
    email?: string;
    password?: string;
    img?: string;
    role?: string;
}

export interface UpdatedUserDto {
    id: number;
    firstName?: string;
    lastName?: string;
    email?: string;
    password?: string;
    img?: string;
    role_id?: number;
}
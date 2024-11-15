export interface Cart {
    id: number;
    userId: number;
}

export interface CartItem {
    id: number;
    userId: number;
    product_id: number;
}

export interface CreateCartDto {
    user_id: number;
}

export interface GetCartDto {
    id?: number;
    user_id?: number;
}

export interface UpdateCartDto {
    id: number;
    user_id?: number;
}


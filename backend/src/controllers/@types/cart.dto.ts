export interface Cart {
    id: number;
    userId: number;
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




export interface CartItem {
    userId: number;
    product_id: number;
}

export interface CreateCartItemDto {
    cart_id: number;
    product_id: number;
}

export interface UpdateCartItemDto {
    cart_id: number;
    product_id: number;
}
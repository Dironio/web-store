export interface CreateCartDao {
    user_id: number;
}

export interface GerCartDao {
    id?: number;
    user_id?: number;
}

export interface UpdateCartDao {
    id: number;
    user_id?: number;
}

export interface CreateCartItemDao {
    cart_id: number;
    product_id: number;
}
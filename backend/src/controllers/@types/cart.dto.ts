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

}
export interface Product {
    id: number;
    seller_id: number;
    name: string;
    category: string;
    full_category: string;
    brand: string;
    seller: string;
    rating: string;
    price: number;
    description: string;
    sales: number;
    url: string;
    photo_url: string;
    max_price: number;
    min_price: number;
    avg_price: number;
    created_at: Date;
    updated_at: Date;
}

export interface CreateProductDto {
    name: string;
    
}
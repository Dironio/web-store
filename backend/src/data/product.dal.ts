import pool from "../pool";
import { CreateProductDao, GetProductDao, UpdateProductDao } from "../data/@types/product.dao";


class ProductDal {
    async create(dao: CreateProductDao) {
        const {
            seller_id, name, category, full_category, brand, seller, rating, price,
            description, sales, url, photo_url, max_price, min_price, avg_price
        } = dao;

        const result = await pool.query(
            `
            INSERT INTO products (
                seller_id, name, category, full_category, brand, seller, rating, price, 
                description, sales, url, photo_url, max_price, min_price, avg_price
            ) 
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15) 
            RETURNING *;
            `,
            [
                seller_id, name, category, full_category, brand, seller, rating,
                price, description, sales, url, photo_url, max_price, min_price, avg_price
            ]

        );
        return result.rows[0];
    }

    async getAll(dao: GetProductDao) {
        const result = await pool.query(`
        SELECT products.*
        FROM products
    `);
        return result.rows;
    }

    async getOne(id: number) {
        const result = await pool.query(
            `
            SELECT * FROM products
            WHERE id = $1;
            `,
            [id]
        );
        return result.rows[0];
    }

    async update(dao: UpdateProductDao) {
        const { id, seller_id, name, category, full_category, brand, seller, rating, price,
            description, sales, url, photo_url, max_price, min_price, avg_price } = dao;
        
        
        console.log(pool.query(
                
            `
            UPDATE products
            SET 
                seller_id = COALESCE($2, seller_id),
                name = COALESCE($3, name),
                category = COALESCE($4, category),
                full_category = COALESCE($5, full_category),
                brand = COALESCE($6, brand),
                seller = COALESCE($7, seller),
                rating = COALESCE($8, rating),
                price = COALESCE($9, price),
                description = COALESCE($10, description),
                sales = COALESCE($11, sales),
                url = COALESCE($12, url),
                photo_url = COALESCE($13, photo_url),
                max_price = COALESCE($14, max_price),
                min_price = COALESCE($15, min_price),
                avg_price = COALESCE($16, avg_price),
                updated_at = NOW()
            WHERE id = $1
            RETURNING *;
            `,
            [
                id, seller_id, name, category, full_category, brand, seller, rating, price,
                description, sales, url, photo_url, max_price, min_price, avg_price
            ]
        ));
        
            const result = await pool.query(
                
            `
            UPDATE products
            SET 
                seller_id = COALESCE($2, seller_id),
                name = COALESCE($3, name),
                category = COALESCE($4, category),
                full_category = COALESCE($5, full_category),
                brand = COALESCE($6, brand),
                seller = COALESCE($7, seller),
                rating = COALESCE($8, rating),
                price = COALESCE($9, price),
                description = COALESCE($10, description),
                sales = COALESCE($11, sales),
                url = COALESCE($12, url),
                photo_url = COALESCE($13, photo_url),
                max_price = COALESCE($14, max_price),
                min_price = COALESCE($15, min_price),
                avg_price = COALESCE($16, avg_price),
                updated_at = NOW()
            WHERE id = $1
            RETURNING *;
            `,
            [
                id, seller_id, name, category, full_category, brand, seller, rating, price,
                description, sales, url, photo_url, max_price, min_price, avg_price
            ]
        );

        return result.rows[0];
    }

    async delete(id: number) {
        const result = await pool.query(
            `
            DELETE FROM products
            WHERE id = $1
            RETURNING *;
            `,
            [id]
        );

        return result.rows[0];
    }
}

const productDal = new ProductDal();
export default productDal;
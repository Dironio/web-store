import pool from "../pool";
import { CreateCartDao, UpdateCartDao } from "../data/@types/cart.dao";


class CartDal {
    async create(dao: CreateCartDao) {
        const { user_id } = dao;

        const result = await pool.query(
            `INSERT INTO carts (user_id)
             VALUES ($1)
             RETURNING *
             `,
            [user_id]
        );

        return result.rows[0];
    }

    async getAll() {
        const result = await pool.query(
            `
            SELECT c.id, c.user_id,  username, email, "password", first_name, last_name, img, age, birthday, role_id, role, created_at, updated_at
            FROM carts c
            JOIN users u ON u.id = c.user_id 
            JOIN roles r ON u.role_id = r.id 
            `
        );

        return result.rows;
    }

    async getOne(id: number) {
        const result = await pool.query(`
            SELECT c.id, c.user_id,  username, email, "password", first_name, last_name, img, age, birthday, role_id, role, created_at, updated_at
            FROM carts c
            JOIN users u ON u.id = c.user_id 
            JOIN roles r ON u.role_id = r.id 
            WHERE c.id = $1
            `, [id]);

        return result.rows[0];
    }

    async update(dao: UpdateCartDao) {
        const { id, user_id } = dao;

        const result = await pool.query(
            `
            UPDATE carts
            SET 
                user_id = COALESCE($2, user_id)
            WHERE 
                id= $1
            RETURNING *
            `, [id, user_id]
        );

        return result.rows[0];
    }

    async delete(id: number) {
        const result = await pool.query(
            `
            DELETE FROM carts
            WHERE id = $1
            RETURNING *
            `, [id]
        );

        return result.rows[0];
    }


















    async createItem(cartId: number, productId: number, quantity: number) {
        const result = await pool.query(`
            INSERT INTO cart_items (cart_id, product_id, quantity)
            VALUES ($1, $2, $3)
            ON CONFLICT (cart_id, product_id)
            DO UPDATE SET quantity = cart_items.quantity + $3
            RETURNING *`,
            [cartId, productId, quantity]
        );
        return result.rows[0];
    }


    async getCartItems(cartId: number) {
        const result = await pool.query(`
            SELECT p.*, ci.quantity
            FROM cart_items ci
            JOIN products p ON ci.product_id = p.id
            WHERE ci.cart_id = $1`,
            [cartId]
        );
        return result.rows;
    }

    async updateCartItem(cartId: number, productId: number, quantity: number) {
        const result = await pool.query(`
            UPDATE cart_items
            SET quantity = $3
            WHERE cart_id = $1 AND product_id = $2
            RETURNING *`,
            [cartId, productId, quantity]
        );
        return result.rows[0];
    }

    async deleteItem(cartId: number, productId: number) {
        const result = await pool.query(`
            DELETE FROM cart_items
            WHERE cart_id = $1 AND product_id = $2
            RETURNING *`,
            [cartId, productId]
        );
        return result.rows[0];
    }

    async clearCart(cartId: number) {
        await pool.query(`
            DELETE FROM cart_items 
            WHERE cart_id = $1`, [cartId]);

    }
}



const cartDal = new CartDal();
export default cartDal;
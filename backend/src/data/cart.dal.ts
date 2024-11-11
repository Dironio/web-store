import pool from "../pool";


class CartDal {
    async create(userId: number) {
        const result = await pool.query(
            `INSERT INTO carts (user_id) VALUES ($1) RETURNING *`,
            [userId]
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
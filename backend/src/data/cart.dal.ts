import pool from "../pool";
import { CreateCartDao, CreateCartItemDao, UpdateCartDao, UpdateCartItemDao } from "../data/@types/cart.dao";


class CartDal {
    async create(dao: CreateCartDao) {
        const { user_id } = dao;

        // сделать проверку на созданную запись

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
            SELECT *
            FROM carts
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

    async getCount(user_id: number) {
        const result = await pool.query(`
            SELECT COUNT(*) AS count
            FROM cart_items ci
            JOIN carts c ON ci.cart_id = c.id
            WHERE c.user_id = $1
            `, [user_id]);


        return parseInt(result.rows[0].count, 10);
    }


    //


    async createItem(dao: CreateCartItemDao) { //???
        const { cart_id, product_id } = dao;
        const result = await pool.query(`
            INSERT INTO cart_items (cart_id, product_id)
            VALUES ($1, $2)
            RETURNING *`,
            [cart_id, product_id]
        );

        return result.rows[0];
    }


    async getAllItem(user_id: number) { //перепроверить запрос
        const result = await pool.query(`
            SELECT 
            ci.id AS cart_item_id, 
            p.id AS product_id, 
            p.name AS product_name, 
            p.price, 
            p.img 
            FROM cart_items ci
            JOIN carts c ON ci.cart_id = c.id
            JOIN products p ON ci.product_id = p.id
            WHERE c.user_id = $1
            `, [user_id]);

        return result.rows;
    }

    async getOneItem(id: number) {
        const result = await pool.query(
            `
            SELECT *
            FROM cart_item
            WHERE id = $1
            `, [id]
        );

        return result.rows[0];
    }

    async updateItem(dao: UpdateCartItemDao) { //подумать как сделать и внизу также
        const result = await pool.query(`
            UPDATE cart_items
            SET quantity = $3
            WHERE cart_id = $1 AND product_id = $2
            RETURNING *`,
            []
        );
        return result.rows[0];
    }

    async deleteItem(id: number) {
        const result = await pool.query(`
            DELETE FROM cart_items
            WHERE cart_id = $1 AND product_id = $2
            RETURNING *`,
            []
        );
        return result.rows[0];
    }

    async clearCart(cartId: number) {
        const result = await pool.query(`
            DELETE FROM cart_items 
            WHERE cart_id = $1`, [cartId]);

        return result.rows[0];
    }
}


const cartDal = new CartDal();
export default cartDal;
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
            SELECT c.id, c.user_id,  username, email, first_name, last_name, img, age, birthday, role_id, role, created_at, updated_at
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


    // Добавление товара
    async addItemToCart(cartId: number, productId: number) {
        // const result = await pool.query(`
        //     INSERT INTO cart_items (cart_id, product_id)
        //     VALUES ($1, $2)
        //     RETURNING *;
        //     `, [cartId, productId]);
        // return result.rows[0];



        const existingItem = await pool.query(`
            SELECT quantity FROM cart_items
            WHERE cart_id = $1 AND product_id = $2;
        `, [cartId, productId]);

        if (existingItem.rows.length > 0) {
            const newQuantity = existingItem.rows[0].quantity + 1;
            const result = await pool.query(`
                UPDATE cart_items
                SET quantity = $1
                WHERE cart_id = $2 AND product_id = $3
                RETURNING *;
            `, [newQuantity, cartId, productId]);
            return result.rows[0];
        } else {
            const result = await pool.query(`
                INSERT INTO cart_items (cart_id, product_id, quantity)
                VALUES ($1, $2, $3)
                RETURNING *;
            `, [cartId, productId, 1]);
            return result.rows[0];
        }


    }

    // Получение корзины пользователя
    async getCartIdByUserId(userId: number) {
        const result = await pool.query(`
      SELECT id
      FROM carts
      WHERE user_id = $1;
    `, [userId]);
        return result.rows[0].id;
    }

    // Получение количества товаров
    async getTotalItemsInCart(cartId: number) {
        const result = await pool.query(`
      SELECT 
        COUNT(*) AS total_items
      FROM cart_items
      WHERE cart_id = $1;
    `, [cartId]);
        return parseInt(result.rows[0]?.total_items, 10) || 0;
    }

    // Получение списка товаров
    async getItemsInCart(cartId: number) {
        const result = await pool.query(`
       SELECT p.id AS product_id, p.name AS product_name, p.price, ci.quantity
        FROM cart_items ci
        JOIN products p ON ci.product_id = p.id
        WHERE ci.cart_id = $1;
    `, [cartId]);
        return result.rows;
    }

    // Удаление товара
    async removeItemFromCart(userId: number, productId: number) {
        const result = await pool.query(`
        delete from cart_items
        where product_id = $2 and cart_id = (
        select cart_id from carts where user_id = $1
        )
		returning *
    `, [userId, productId]);
        return result.rows[0];
    }

    // Удаление корзины по пользователю
    async deleteCartByUserId(userId: number) {
        const result = await pool.query(`
      DELETE FROM carts
      WHERE user_id = $1
      RETURNING *;
    `, [userId]);
        return result.rows[0];
    }






    async createOrGetCart(userId: number) {
        const existingCart = await pool.query(`
            SELECT id FROM carts WHERE user_id = $1 LIMIT 1;
        `, [userId]);

        if (existingCart.rows.length > 0) {
            return existingCart.rows[0];
        }

        const newCart = await pool.query(`
            INSERT INTO carts (user_id) VALUES ($1) RETURNING *;
        `, [userId]);
        return newCart.rows[0];
    }

    async getCartItemsByUserId(userId: number) {
        const itemsResult = await pool.query(`
            SELECT *
            FROM cart_items
            JOIN products p ON cart_items.product_id = p.id
            JOIN carts on cart_items.cart_id = carts.id
            WHERE carts.user_id = $1
        `, [userId]);

        return itemsResult.rows;
    }
}


const cartDal = new CartDal();
export default cartDal;
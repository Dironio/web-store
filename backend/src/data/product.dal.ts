import pool from "../pool";


class ProductDal {
    async create(dao: CreateProductDao) {
        const result = await pool.query(`
            INSERT INTO products ()
            VALUES ($1, $2)
        `, []);
        return result.rows[0];
    }

    async getAll() {
        const result = await pool.query(`
        SELECT products.*
        FROM products
    `);
        return result.rows;
    }

    async getOne() {
        const result = await pool.query(`
            SELECT *
            FROM products

            `);
        return result.rows[0];
    }

    async update() {
        const result = await pool.query(`
            UPDATE products
            SET
            WHERE
            id= $
            `);
        return result.rows[0];
    }

    async delete() {
        const result = await pool.query(`
            DELETE FROM products
            WHERE id=$1
            `);
        return result.rows[0];
    }
}

const productDal = new ProductDal();
export default productDal;
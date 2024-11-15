import pool from "src/pool";
import { CreateAnalyticDao, UpdateAnalyticDao } from "../data/@types/analytic.dao"


class AnalyticDal {
    async create(dao: CreateAnalyticDao) {
        const { } = dao;

        const result = await pool.query(`
            
            `, []);

        return result.rows[0];
    }

    async getAll() {
        const result = await pool.query(
            `
            
            `
        );

        return result.rows;
    }

    async getOne(id: number) {
        const result = await pool.query(
            `
            
            `
            , [id]);

        return result.rows[0];
    }

    async update(dao: UpdateAnalyticDao) {
        const { } = dao;

        const result = await pool.query(
            `
            
            `
            , []);

        return result.rows[0];
    }

    async delete(id: number) {
        const result = await pool.query(
            `
            
            `
            , []);

        return result.rows[0];
    }
}

const analyticDal = new AnalyticDal();
export default analyticDal;
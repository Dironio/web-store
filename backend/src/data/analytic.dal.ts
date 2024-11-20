import pool from "../pool";
import { CreateAnalyticDao, UpdateAnalyticDao } from "../data/@types/analytic.dao"


class AnalyticDal {
    async create(dao: CreateAnalyticDao) {
        const { user_id, product_id, event_id, event_data, page_url, timestamp, geolocation, session_id, user_agent, duration, tech_metrics } = dao;
        const result = await pool.query(`
            INSERT INTO user_analytics (user_id, product_id, event_id, event_data, page_url, timestamp, geolocation, session_id, user_agent, duration, tech_metrics)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
            RETURNING *
            `, [user_id, product_id, event_id, event_data, page_url, timestamp, geolocation, session_id, user_agent, duration, tech_metrics]);

        return result.rows[0];
    }

    async getAll() {
        const result = await pool.query(`
            SELECT *
            FROM user_analytics
            JOIN events on user_analytics.id = events.id
            `
        );

        return result.rows;
    }

    async getOne(id: number) { //Надо подумать, возможно через session_id (dalee toje samoe)
        const result = await pool.query(`
            SELECT *
            FROM user_analytics
            JOIN events on user_analytics.id = events.id
            WHERE user_id = $1           
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
        const result = await pool.query(`
            DELETE FROM user_analytics
            WHERE id = $1
            `
            , []);

        return result.rows[0];
    }
}

const analyticDal = new AnalyticDal();
export default analyticDal;
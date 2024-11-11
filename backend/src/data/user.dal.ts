import { User } from "../controllers/@types/user.dto";
import pool from "../pool";
import { CreateUserDao, GetUserDao, UpdatedUserDto } from "./@types/user.dao";

class UserDal {
    // Метод для создания пользователя
    async create(dao: CreateUserDao) {
        const { firstName, lastName, email, password, img, role_id } = dao;
        const result = await pool.query(`
            INSERT INTO users (first_name, last_name, email, password, img, role_id)
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING *`,
            [firstName, lastName, email, password, img, role_id]
        );
        return result.rows[0];
    }

    // Метод для получения всех пользователей
    async getAll(dao: GetUserDao): Promise<User[]> {
        const allUsers = await pool.query(`
            SELECT users.*
            FROM users
        `);
        return allUsers.rows;
    }

    // Метод для получения одного пользователя по id
    async getOne(userId: number) {
        const oneUser = await pool.query(`
            SELECT users.*, roles.name as role 
            FROM users
            JOIN roles ON roles.id = users.role_id
            WHERE users.id = $1`,
            [userId]
        );
        return oneUser.rows[0];
    }

    // Метод для обновления данных пользователя
    async update(updatedUserDto: UpdatedUserDto) {
        const { id, firstName, lastName, email, password, img, role_id } = updatedUserDto;
        const updatedUser = await pool.query(`
            UPDATE users
            SET first_name = $2, last_name = $3, email = $4, password = $5, img = $6, role_id = $7
            WHERE id = $1
            RETURNING *`,
            [id, firstName, lastName, email, password, img, role_id]
        );
        return updatedUser.rows[0];
    }

    // Метод для удаления пользователя
    async delete(userId: number) {
        const deletedUser = await pool.query(`
            DELETE FROM users
            WHERE id = $1
            RETURNING *`,
            [userId]
        );
        return deletedUser.rows[0];
    }
}

const userDal = new UserDal();
export default userDal;

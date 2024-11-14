import { User } from "../controllers/@types/user.dto";
import pool from "../pool";
import { CreateUserDao, GetUserDao, UpdateUserDao } from "./@types/user.dao";
import bcrypt from "bcrypt";

class UserDal {
    async create(dao: CreateUserDao): Promise<User> {
        const { username, email, password, firstName, lastName, img, age, birthday } = dao;

        const hashedPassword = await bcrypt.hash(password, 10);

        const defaultRoleId = 2;


        const result = await pool.query(`
            INSERT INTO users (username, email, password, first_name, last_name, img, age, birthday, role_id)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
            RETURNING *`,
            [username, email, hashedPassword, firstName, lastName, img, age, birthday, defaultRoleId]
        );

        return result.rows[0];
    }

    async getAll(): Promise<User[]> {
        const result = await pool.query(`
            SELECT users.id, username, email, "password", first_name, last_name, img, age, birthday, role_id, role, created_at, updated_at
            FROM users
            JOIN roles on roles.id = users.role_id
        `);
        return result.rows;
    }

    async getOne(id: number): Promise<User> {
        const result = await pool.query(`
            SELECT users.*, roles.name as role 
            FROM users
            JOIN roles ON roles.id = users.role_id
            WHERE users.id = $1`,
            [id]
        );
        return result.rows[0];
    }

    async getUserByEmail(email: string): Promise<User> {
        const result = await pool.query(`
            SELECT * FROM users
            WHERE email = $1`,
            [email]
        );
        return result.rows[0];
    }

    async updateUser(dao: UpdateUserDao): Promise<User> {
        const { id, username, email, password, firstName, lastName, img, age, birthday, role_id } = dao;
        const hashedPassword = password ? await bcrypt.hash(password, 10) : undefined;


        const result = await pool.query(`
            UPDATE users
            SET 
                username = COALESCE($2, username), 
                email = COALESCE($3, email),
                password = COALESCE($4, password),
                first_name = COALESCE($5, first_name),
                last_name = COALESCE($6, last_name),
                img = COALESCE($7, img),
                age = COALESCE($8, age),
                birthday = COALESCE($9, birthday),
                role_id = COALESCE($10, role_id)
            WHERE id = $1
            RETURNING *`,
            [id, username, email, hashedPassword, firstName, lastName, img, age, birthday, role_id]
        );


        return result.rows[0] || null;

    }


    async delete(id: number): Promise<User | null> {
        const result = await pool.query(`
            DELETE FROM users
            WHERE id = $1
            RETURNING *`,
            [id]
        );
        return result.rows[0] || null;
    }
}

const userDal = new UserDal();
export default userDal;

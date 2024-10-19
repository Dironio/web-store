import pool from "../pool";


class UserDal {
    async create(createUserDao: CreateUserDao) {
        const {insertString, insertValues} = createUserDao)
          const result = await pool.query(`
          INSERT INTO users 
          
            RETURNING * `,
            insertValues);
          return result.rows[0]
      }
  
      async getAll (findUserDao: FindUserDao) {
        const {conditionString, conditionValues} = (findUserDao)
        const allUsers = await pool.query(
          `SELECT  users.*, roles.name as role
          FROM users
          JOIN roles on roles.id = users.role_id
          ${conditionString}`
        , conditionValues)
        return allUsers.rows          
      }
  
      async getOne (userId: number) {
        const {conditionString, conditionValues} = ({'users.id':userId})
       
        console.log( 
          `SELECT users.*, roles.name as role 
        FROM users
        JOIN roles on roles.id = users.role_id
        
        `,)
  
        const oneUser = await pool.query(
          `SELECT users.*, roles.name as role 
          FROM users
          JOIN roles on roles.id = users.role_id
          ${conditionString}
          `, conditionValues
        )
        return oneUser.rows[0]
      }
  
      async update (updatedUserDto: UpdatedUserDto) {
        
        const { id, ...other } = updatedUserDto
        const {setString,setValues} = other,2;
        console.log(`
        UPDATE
          users
        SET

        WHERE
          id = $1
        RETURNING
          *
        `)
        const updatedUser = await pool.query(`
        UPDATE
          users
        SET

        WHERE
          id = $1
        RETURNING
          *
        `,[id, ...setValues]
        )
  
        
  
        return updatedUser.rows[0]
      }
  
      async delete (userId: number) {
  
        const deletedUser = await pool.query(
          `
          DELETE FROM users
          where id=$1
          RETURNING 
          *
          `,[userId]
        )
        return deletedUser.rows[0]
      }
  
}

const userDal = new UserDal();
export default userDal;
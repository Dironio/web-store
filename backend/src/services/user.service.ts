import { CreateUserDto, GetUserDto, User } from "../controllers/@types/user.dto"
import { UpdatedUserDto } from "../data/@types/user.dao"
import userDal from "../data/user.dal"


class UserService {
    async create (createUserDto: CreateUserDto): Promise<User> {
        return await userDal.create(createUserDto)
    }

    async getAll () {
        return await userDal.getAll()
    }

    async getOne (userId: number) {
        return await userDal.getOne(userId)
    }

    async update (updatedUserDto: UpdatedUserDto) {
        return await userDal.update(updatedUserDto)
    }

    async delete (userId: number) {
        return await userDal.delete(userId)
    }
}

const userService = new UserService();
export default userService;
import { CreateUserDto, GetUserDto, User } from "../controllers/@types/user.dto"
import { UpdatedUserDto } from "../data/@types/user.dao"
import userDal from "../data/user.dal"


class UserService {
    async create (dto: CreateUserDto): Promise<User> {
        return await userDal.create(dto)
    }

    async getAll (dto: GetUserDto) {
        return await userDal.getAll(dto)
    }

    async getOne (userId: number) {
        return await userDal.getOne(userId)
    }

    async update (dto: UpdatedUserDto) {
        return await userDal.update(dto)
    }

    async delete (userId: number) {
        return await userDal.delete(userId)
    }
}

const userService = new UserService();
export default userService;
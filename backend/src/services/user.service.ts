import { CreateUserDto } from "./@types/user.dto"


class UserService {
    async create (createUserDto: CreateUserDto) {
        return await userDal.create(createUserDto)
    }

    async getAll (getUserDto: getUserDto) {
        return await userDal.getAll(getUserDto)
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
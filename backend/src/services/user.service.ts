import { CreateUserDto, GetUserDto, UpdateUserDto, User } from "../controllers/@types/user.dto"
import userDal from "../data/user.dal"


class UserService {
    calculateAge(birthday: Date): number {
        const today = new Date();
        let age = today.getFullYear() - birthday.getFullYear();
        const monthDiff = today.getMonth() - birthday.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthday.getDate())) {
            age--;
        }
        return age;
    }

    async create(dto: CreateUserDto): Promise<User> {
        if (dto.birthday) {
            dto.age = this.calculateAge(dto.birthday);
        }

        return await userDal.create(dto);
    }

    async getAll() {
        return await userDal.getAll();
    }

    async getOne(userId: number) {
        return await userDal.getOne(userId)
    }

    async getUserByEmail(dto: ): Promise<User> {
        return await userDal.getUserByEmail(dto);
    }

    async update(dto: UpdateUserDto) {
        if (dto.birthday) {
            dto.age = this.calculateAge(dto.birthday);
        }

        return await userDal.updateUser(dto);
    }

    async delete(userId: number) {
        return await userDal.delete(userId)
    }
}

const userService = new UserService();
export default userService;
import { CreateUserDto, GetUserDto, UpdateUserDto, User } from "../controllers/@types/user.dto"
import userDal from "../data/user.dal";
import bcrypt from "bcrypt";


class UserService {
    calculateAge(birthday: Date | string): number {
        const birthDate = typeof birthday === 'string' ? new Date(birthday.replace('/', '-')) : birthday;
    
        if (!(birthDate instanceof Date) || isNaN(birthDate.getTime())) {
            throw new Error('Invalid birth date');
        }
    
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
    
    
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
    
        return age;
    }
    

    async create(dto: CreateUserDto): Promise<User> {
        if (dto.birthday) {
            dto.age = this.calculateAge(dto.birthday);
        }

        // const salt = await bcrypt.genSalt(10);
        // dto.password = await bcrypt.hash(dto.password, salt);


        return await userDal.create(dto);
    }

    async getAll() {
        return await userDal.getAll();
    }

    async getOne(userId: number) {
        return await userDal.getOne(userId)
    }

    async getUserByUsername(username: string, email: string): Promise<User> {
        return await userDal.getUserByUsername(username, email);
    }

    async update(dto: UpdateUserDto) {
        if (dto.birthday) {
            dto.age = this.calculateAge(dto.birthday);
        }

        // if (dto.password) {
        //     const salt = await bcrypt.genSalt(10);
        //     dto.password = await bcrypt.hash(dto.password, salt);
        // }

        return await userDal.updateUser(dto);
    }

    async delete(userId: number) {
        return await userDal.delete(userId)
    }
}

const userService = new UserService();
export default userService;
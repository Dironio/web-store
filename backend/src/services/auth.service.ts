import userService from "./user.service";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from "../controllers/@types/user.model";
import { CreateUserDb, CreateUserDto, LoginUserDto } from "../controllers/@types/user.dto";
import { TokenPayload } from "../controllers/@types/tokenPayLoad";
import ApiError from "../middlewares/apiError";


class AuthService {
    async singup(createUserDto: CreateUserDto) {
        const candidate: User[] = await userService.getAll({ email: createUserDto.email });
        if (candidate[0]) {
            throw ApiError.BadRequest('Пользователь с таким email уже существует');
        }

        const hashPassword: string = await bcrypt.hash(createUserDto.password, 3);
        const createUserDb: CreateUserDb = {
            ...createUserDto,
            password: hashPassword
        };
        const newUser: User = await userService.create(createUserDb);

        const tokenPayload: TokenPayload = {
            id: newUser.id,
            email: newUser.email,
            role: newUser.role
        };

        const jwtToken: string = jwt.sign(tokenPayload, process.env.JWT_SECRET as string, { expiresIn: '30d' });

        return { user: newUser, token: jwtToken };
    }

    async login(loginUserDto: LoginUserDto) {
        const result: User[] = await userService.getAll({ email: loginUserDto.email });
        const candidate: User = result[0];

        if (!candidate) {
            throw ApiError.NotFound('Пользователь не найден');
        }

        if (!candidate.password) {
            throw ApiError.BadRequest('Неверный запрос, нет пароля');
        }

        const isPasswordValid: boolean = await bcrypt.compare(loginUserDto.password, candidate.password);

        if (!isPasswordValid) {
            throw ApiError.UnauthorizedError('Неверный пароль');
        }

        const tokenPayload: TokenPayload = {
            id: candidate.id,
            email: candidate.email,
            role: candidate.role
        };

        const jwtToken: string = jwt.sign(tokenPayload, process.env.JWT_SECRET as string, { expiresIn: '30d' });
        return { user: candidate, token: jwtToken };
    }

    validateRefreshToken(refreshToken: string): TokenPayload | null {
        let userData: TokenPayload | null = null;

        try {
            userData = jwt.verify(refreshToken, process.env.JWT_SECRET as string) as TokenPayload;
        } catch (err) {
            throw ApiError.UnauthorizedError('Неверный токен');
        }

        return userData;
    }
}

const authService = new AuthService();
export default authService;

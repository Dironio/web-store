import userService from "./user.service";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { CreateUserDb, CreateUserDto, LoginUserDto, User } from "../controllers/@types/user.dto";
import { TokenPayload } from "../controllers/@types/tokenPayLoad";
import ApiError from "../middlewares/apiError";
import authDal from "../data/auth.dal";


class AuthService {
    generateTokens(payload: TokenPayload): JwtTokens {
        const refreshToken = jwt.sign(payload, process.env.JWT_REF_SEC as string, { expiresIn: '30d' });
        const accessToken = jwt.sign(payload, process.env.JWT_ACC_SEC as string, { expiresIn: '15m' });

        return { refreshToken, accessToken };
    }


    validateRefreshToken(refreshToken: string): TokenDecoded | null {
        try {
            return jwt.verify(refreshToken, process.env.JWT_REF_SEC as string) as TokenDecoded;
        } catch (err) {
            return null;
        }
    }


    validateAccessToken(accessToken: string): TokenPayload | null {
        try {
            return jwt.verify(accessToken, process.env.JWT_ACC_SEC as string) as TokenPayload;
        } catch (err) {
            return null;
        }
    }


    async signup(dto: CreateUserDto): Promise<CreatedUser> {
        const existingUser = await userService.get({ email: dto.email });
        if (existingUser[0]) throw ApiError.BadRequest('Email already used');


        const hashPassword = await bcrypt.hash(dto.password, 3);
        const newUser: User = await userService.create({
            ...dto,
            password: hashPassword
        });


        const tokenPayload: TokenPayload = {
            id: newUser.id,
            email: newUser.email,
            username: newUser.username,
        };


        const jwtTokens = this.generateTokens(tokenPayload);
        await authDal.create({ userId: newUser.id, refreshToken: jwtTokens.refreshToken });


        return { user: newUser, tokens: jwtTokens };
    }


    async login(loginUserDto: LoginUserDto): Promise<CreatedUser> {
        const users = await userService.get({ username: loginUserDto.username });
        const candidate = users[0];


        if (!candidate) throw ApiError.NotFound('User not found');
        if (!candidate.password) throw ApiError.BadRequest('Password is missing');


        const isPasswordValid = await bcrypt.compare(loginUserDto.password, candidate.password);
        if (!isPasswordValid) throw ApiError.UnauthorizedError('Invalid password');


        const tokenPayload: TokenPayload = {
            id: candidate.id,
            username: candidate.username,
        };


        const jwtTokens = this.generateTokens(tokenPayload);
        await authDal.update({ userId: candidate.id, refreshToken: jwtTokens.refreshToken });


        return { user: candidate, tokens: jwtTokens };
    }


    async refresh(refreshToken: string): Promise<CreatedUser> {
        if (!refreshToken) throw ApiError.UnauthorizedError();


        const userData = this.validateRefreshToken(refreshToken);
        if (!userData) throw ApiError.UnauthorizedError();


        const token = await authDal.get({ userId: userData.id });
        if (!token || token.refreshToken !== refreshToken) throw ApiError.UnauthorizedError();


        const user = await userService.getById(userData.id);
        const tokenPayload: TokenPayload = {
            id: user.id,
            username: user.username,
        };


        const jwtTokens = this.generateTokens(tokenPayload);
        await authDal.update({ userId: user.id, refreshToken: jwtTokens.refreshToken });


        return { user, tokens: jwtTokens };
    }


    async logout(refreshToken: string): Promise<void> {
        await authDal.removeToken(refreshToken);
    }

}

const authService = new AuthService();
export default authService;

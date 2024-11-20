import userService from "./user.service";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { CreatedUser, CreateUserDb, CreateUserDto, LoginUserDto, User } from "../controllers/@types/user.dto";
import { JwtTokens, TokenDecoded, TokenPayload } from "../controllers/@types/tokenPayLoad";
import ApiError from "../middlewares/apiError";
import { config } from "dotenv";

config({ path: './.env' });


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
        const existingUser = await userService.getUserByUsername(dto.username, dto.email);
        if (existingUser) throw ApiError.BadRequest('Email or username already used');

        const newUser = await userService.create(dto);

        const tokenPayload: TokenPayload = {
            id: newUser.id,
            email: newUser.email,
            username: newUser.username,
        };

        const jwtTokens = this.generateTokens(tokenPayload);
        return { user: newUser, tokens: jwtTokens };
    }


    async login(dto: LoginUserDto): Promise<CreatedUser> {
        const user = await userService.getUserByUsername(dto.username, dto.email);
        if (!user) throw ApiError.NotFound('User not found');
        if (!user.password) throw ApiError.BadRequest('Password is missing');


        const isPasswordValid = await bcrypt.compare(dto.password, user.password);
        if (!isPasswordValid) throw ApiError.UnauthorizedError('Invalid password');


        const tokenPayload: TokenPayload = {
            id: user.id,
            username: user.username,
        };


        const jwtTokens = this.generateTokens(tokenPayload);
        return { user, tokens: jwtTokens };
    }


    async refresh(refreshToken: string): Promise<JwtTokens> {
        if (!refreshToken) throw ApiError.UnauthorizedError();
        const userData = this.validateRefreshToken(refreshToken);
        if (!userData) throw ApiError.UnauthorizedError();


        const user = await userService.getOne(userData.id);
        if (!user) throw ApiError.UnauthorizedError('User not found');


        const tokenPayload: TokenPayload = {
            id: user.id,
            username: user.username,
        };

        //перепроверить работу

        const jwtTokens = this.generateTokens(tokenPayload);
        return jwtTokens;
    }

    // async logout(): Promise<void> {

    // }
}

const authService = new AuthService();
export default authService;

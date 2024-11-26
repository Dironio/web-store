import { CookieOptions, NextFunction, Request, Response } from "express";
import authService from "../services/auth.service";
import userService from "../services/user.service";
import ControllerErrorHandler from "./tools/controllerErrorHandler";
import { CreateUserDto, LoginUserDto } from "./@types/user.dto";
import ApiError from "../middlewares/apiError";

class AuthController {
    private getTokenParams(val: string): [string, string, CookieOptions] {
        return ['accessToken', val, { maxAge: 30 * 24 * 3600 * 1000, httpOnly: true }];
    }

    @ControllerErrorHandler()
    async signup(req: Request, res: Response, next: NextFunction): Promise<Response> {
        const dto: CreateUserDto = req.body;
        const result = await authService.signup(dto);

        res.cookie(...this.getTokenParams(result.tokens.accessToken));
        return res.status(201).json(result);
    }

    @ControllerErrorHandler()
    async login(req: Request, res: Response, next: NextFunction): Promise<Response> {
        const dto: LoginUserDto = req.body;
        const result = await authService.login(dto);

        res.cookie(...this.getTokenParams(result.tokens.accessToken));
        return res.status(200).json({
            user: result.user,
            accessToken: result.tokens.accessToken,
        });
    }

    @ControllerErrorHandler()
    async logout(req: Request, res: Response, next: NextFunction): Promise<Response> {
        res.clearCookie('accessToken');
        return res.json({ message: 'Logout success' });
    }

    @ControllerErrorHandler()
    async refresh(req: Request, res: Response, next: NextFunction): Promise<Response> {
        const accessToken = req.cookies.accessToken;
        const userData = authService.validateAccessToken(accessToken);

        if (!userData) throw ApiError.UnauthorizedError();

        const tokens = await authService.refresh(accessToken);
        const user = await userService.getOne(userData.id);

        res.cookie(...this.getTokenParams(tokens.accessToken));
        return res.json({
            user,
            accessToken: tokens.accessToken,
        });
    }
}

const authController = new AuthController();
export default authController;
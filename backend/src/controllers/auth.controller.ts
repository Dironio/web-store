import { CookieOptions, NextFunction, Request, Response } from "express";
import authService from "../services/auth.service";
import userService from "../services/user.service";
import ControllerErrorHandler from "./tools/controllerErrorHandler";
import { CreateUserDto, LoginUserDto } from "./@types/user.dto";

class AuthController {
    private getTokenParams(val: string): [string, string, CookieOptions] {
        return ['refreshToken', val, { maxAge: 30 * 24 * 3600 * 1000, httpOnly: true }];
    }


    async signup(req: Request, res: Response, next: NextFunction): Promise<Response> {
        try {
            const dto: CreateUserDto = req.body;
            const result = await authService.signup(dto);


            res.cookie(...this.getTokenParams(result.tokens.refreshToken));
            return res.status(201).json(result);
        } catch (error) {
            next(error);
        }
    }


    async login(req: Request, res: Response, next: NextFunction): Promise<Response> {
        try {
            const dto: LoginUserDto = req.body;
            const result = await authService.login(dto);


            if (result.tokens?.refreshToken) {
                res.cookie(...this.getTokenParams(result.tokens.refreshToken));
            }
            return res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    }


    async logout(req: Request, res: Response, next: NextFunction): Promise<Response> {
        try {
            const refreshToken = req.cookies.refreshToken;
            await authService.logout(refreshToken);


            res.clearCookie('refreshToken');
            return res.json({ message: 'Logout success' });
        } catch (error) {
            next(error);
        }
    }


    async refresh(req: Request, res: Response, next: NextFunction): Promise<Response> {
        try {
            const refreshToken = req.cookies.refreshToken;
            const result = await authService.refresh(refreshToken);


            res.cookie(...this.getTokenParams(result.tokens.refreshToken));
            return res.json(result.tokens);
        } catch (error) {
            next(error);
        }
    }
}

const authController = new AuthController();
export default authController;
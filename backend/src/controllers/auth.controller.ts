import { CookieOptions, Request, Response } from "express";
import authService from "../services/auth.service";
import userService from "../services/user.service";

function getTokenParams(val: string): [string, string, CookieOptions] {
    return ['refreshToken', val, {
        maxAge: 30 * 24 * 3600 * 1000,
        httpOnly: true
        // secure: true
    }];
}

class AuthController {
    async singup(req: Request, res: Response) {
        try {
            const singup = await authService.singup(req.body)
            res.cookie(...getTokenParams(singup.token))
            return res.status(201).json(singup)
        } catch (e) {
            console.log(e)
            res.status(500).json(e)
        }
    }

    async login(req: Request, res: Response) {
        try {
            const login = await authService.login(req.body)
            res.cookie(...getTokenParams(login.token))
            return res.status(200).json(login)
        } catch (e) {
            console.log(e)
            res.status(500).json(e)
        }
    }

    async logout(req: Request, res: Response) {
        try {
            res.clearCookie('refreshToken')
            return res.status(200).json()
        } catch (e) {
            console.log(e)
            res.status(500).json(e)
        }
    }

    async getCurrentUser(req: Request, res: Response) {
        try {
            const refreshToken: string = req.cookies.refreshToken
            const validateToken = authService.validateRefreshToken(refreshToken)

            if (!validateToken) {
                throw new Error('Не авторизован')
            }

            const user = await userService.getOne(validateToken.id)
            const status = user ? 200 : 204
            return res.status(status).json(user)
        } catch (e) {
            console.log(e)
            res.status(500).json(e)
        }
    }



}

const authController = new AuthController();

export default authController;
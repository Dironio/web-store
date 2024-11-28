import { NextFunction, Request, Response } from "express";
import JWT from 'jsonwebtoken';
import ApiError from "./apiError";
import { TokenPayload } from "src/controllers/@types/tokenPayLoad";
import authService from "../services/auth.service";

function authCheck(req: Request, res: Response, next: NextFunction) {
    try {
        console.log(req.headers.authorization);
        const accessToken: string | undefined = req.headers.authorization?.split(' ')[1];
        if (!accessToken) {
            throw ApiError.UnauthorizedError();
        }


        const userData: TokenPayload | null = authService.validateAccessToken(accessToken);
        if (!userData) {
            throw ApiError.UnauthorizedError();
        }

        res.locals.tokenPayload = userData;
        console.log('Auth succ')
        next();
    } catch (err) {
        next(err);
    }
}

export default authCheck;
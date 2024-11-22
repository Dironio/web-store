import { NextFunction, Request, Response } from "express";
import JWT from 'jsonwebtoken';

function authCheck(req: Request, res: Response, next: NextFunction) {
    if (req.method === 'OPTIONS') {
        return next();
    }

    try {
        const token = req.headers.authorization?.split(' ')[1];

        if (!token) {
            return res.status(401).json('Invalid token');
        }

        const decoded = JWT.verify(token, String(process.env.jwt));
        res.locals.user = decoded;
        next();

    } catch (e: any) {
        return res.status(401).json({
            error: 'Authentication failed. Invalid token',
            details: e
        });
    }
}

export default authCheck;
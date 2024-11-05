import { NextFunction, Request, Response } from "express";

export type ControllerFunction = (
    req: Request, 
    res: Response, 
    next: NextFunction
) => Promise<Response | void>;

export default function ControllerErrorHandler() {
    return function (
        _target: any,
        _propertyKey: string | symbol,
        descriptor: PropertyDescriptor
    ): PropertyDescriptor {
        const originalMethod = descriptor.value;

        descriptor.value = async function (
            req: Request,
            res: Response,
            next: NextFunction
        ): Promise<Response | void> {
            try {
                const result = await originalMethod.call(this, req, res, next);
                return result || res;
            } catch (error) {
                next(error);
                return;
            }
        };

        return descriptor;
    };
}
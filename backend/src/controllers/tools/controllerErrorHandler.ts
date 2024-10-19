import { NextFunction, Request, Response } from "express";

export type ControllerFunction = (req: Request, res: Response, next: NextFunction) => Promise<Response>;

export default function ControllerErrorHandler(log: boolean = true) {
    return (
        target: Object,
        _: string | symbol,
        descriptor: TypedPropertyDescriptor<ControllerFunction>
    ): TypedPropertyDescriptor<ControllerFunction> | void => {
        const method = descriptor.value;
        descriptor.value = async (req, res, next) => {
            let result: Response = res;  // Инициализируем result значением по умолчанию

            res.locals.log = log;

            try {
                result = await method?.call(target, req, res, next) || res;  // Добавляем fallback на res
                next();
            } catch (err) {
                if (err instanceof Error) {
                    next(err);
                }
            }

            return result;
        };
    };
}

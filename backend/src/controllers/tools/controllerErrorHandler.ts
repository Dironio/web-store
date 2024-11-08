import { NextFunction, Request, Response } from "express";

export type ControllerFunction = (req: Request, res: Response, next: NextFunction) => Promise<Response | void>;

export default function ControllerErrorHandler(log: boolean = true) {
    return function (
        target: Object,
        propertyKey: string | symbol,
        descriptor: TypedPropertyDescriptor<ControllerFunction>
    ): TypedPropertyDescriptor<ControllerFunction> | void {
        
        const originalMethod = descriptor.value!;
        
        descriptor.value = async function (req: Request, res: Response, next: NextFunction): Promise<Response | void> {
            res.locals.log = log;
            res.locals.pathFound = true;

            try {
                const result = await originalMethod.call(this, req, res, next);
                return result;  // Возвращаем результат, если он есть
            } catch (err) {
                if (err instanceof Error) {
                    next(err);
                }
            }

            // В случае ошибки обработчик передаст управление дальше
            return next();
        };
        
        return descriptor;
    };
}

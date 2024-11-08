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
            res.locals.log = log;  
            res.locals.pathFound = true;  

            try {  
                const result = await method?.call(target, req, res, next);  
                // Handle the result here  
                if (result) {  
                    return result; // Возвращаем Response, если он существует  
                }  
            } catch (err) {  
                if (err instanceof Error) {  
                    return next(err);  
                }  
            }  

            // Если no result, call next  
            return next();  
        };  
    };  
}
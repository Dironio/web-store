import { NextFunction, Request, Response, Router } from "express";
import ApiError from "../middlewares/apiError";
import userRouter from "./user.router";
import authRouter from "./auth.router";
import productRouter from "./product.router";
import cartRouter from "./cart.router";
import  analyticRouter from "./analytic.router";

const rootRouter: Router = Router();

rootRouter.use('/users', userRouter);
rootRouter.use('/auth', authRouter);
rootRouter.use('/products', productRouter);
rootRouter.use('/carts', cartRouter);
rootRouter.use('/analytics', analyticRouter)




rootRouter.use('*', (req: Request, res: Response, next: NextFunction) => {
    if (!res.locals.log) {
        console.log(404);
        res.locals.log = true;
        throw ApiError.NotFound();
    } else {
        next();
    }
});


export default rootRouter;
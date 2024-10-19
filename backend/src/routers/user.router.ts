import { Router } from "express";


const userRouter: Router = Router();

userRouter.use('/', userController.create);


export default userRouter;
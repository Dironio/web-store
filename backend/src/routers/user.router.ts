import { Router } from "express";
import userController from "../controllers/user.controller";


const userRouter = Router();

userRouter.post('/auth', userController.create);
userRouter.get('/', userController.getAll);



export default userRouter;
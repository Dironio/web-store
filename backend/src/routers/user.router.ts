import { Router } from "express";
import userController from "../controllers/user.controller";


const userRouter = Router();

userRouter.post('/auth', userController.create);
userRouter.get('/', userController.getAll);
userRouter.get('/:id', userController.getOne);
userRouter.patch('/', userController.update);
userRouter.delete('/:id', userController.delete);

export default userRouter;
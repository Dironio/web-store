import { Router } from "express";
import userController from "../controllers/user.controller";
import authCheck from "../middlewares/auth.middleware";


const userRouter = Router();

userRouter.post('/', userController.create);
userRouter.get('/', authCheck, userController.getAll);
userRouter.get('/:id', authCheck, userController.getOne);
userRouter.patch('/', authCheck, userController.update);
userRouter.delete('/:id', authCheck, userController.delete);

export default userRouter;
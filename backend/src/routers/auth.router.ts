import { Router } from "express";
import authController from "../controllers/auth.controller";
import authValidate from "../middlewares/auth.middleware";
import authCheck from "../middlewares/auth.middleware";
// import loginValidate from '../middlewares/auth.validate'
// import errorMiddleware from "../middlewares/error.middleware";

const authRouter: Router = Router()

authRouter.post('/signup',
    // authValidate,
    // errorMiddleware,
    authController.signup);

authRouter.post('/login', authController.login);
authRouter.get('/logout', authCheck, authController.logout);
authRouter.get('/current', authCheck, authController.current);

export default authRouter
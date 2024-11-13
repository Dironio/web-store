import { Router } from "express";
import authController from "../controllers/auth.controller";

const authRouter: Router = Router()

authRouter.post('/signup', authController.signup)
authRouter.post('/login', authController.login)
authRouter.get('/logout', authController.logout)
authRouter.get('/current', authController.refresh)

export default authRouter
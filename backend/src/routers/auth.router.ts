import { Router } from "express";
import authController from "../controllers/auth.controller";

const authRouter: Router = Router()

authRouter.post('/signup', authController.singup)
authRouter.post('/login', authController.login)
authRouter.get('/logout', authController.logout)
authRouter.get('/current', authController.getCurrentUser)

// authRouter.post('/signup', (req, res, next) => authController.singup(req, res).catch(next));
// authRouter.post('/login', (req, res, next) => authController.login(req, res).catch(next));
// authRouter.get('/logout', (req, res, next) => authController.logout(req, res).catch(next));
// authRouter.get('/current', (req, res, next) => authController.getCurrentUser(req, res).catch(next));





export default authRouter
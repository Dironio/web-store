import { Request, Response, NextFunction } from "express";
import userService from "../services/user.service";
import ControllerErrorHandler from "./tools/controllerErrorHandler";

class UserController {
    @ControllerErrorHandler()
    async create(req: Request, res: Response, next: NextFunction): Promise<Response> {
        const newUser = await userService.create(req.body);
        return res.status(201).json(newUser);
    }

    @ControllerErrorHandler()
    async getAll(req: Request, res: Response, next: NextFunction): Promise<Response> {
        const users = await userService.getAll();
        return res.status(200).json(users);
    }

    @ControllerErrorHandler()
    async getOne(req: Request, res: Response, next: NextFunction): Promise<Response> {
        const userId = Number(req.params.id);
        const user = await userService.getOne(userId);
        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }
        return res.status(200).json(user);
    }

    @ControllerErrorHandler()
    async update(req: Request, res: Response, next: NextFunction): Promise<Response> {
        try {
            const userId = Number(req.params.id);
            const updatedUser = await userService.update({ ...req.body, id: userId });
            if (!updatedUser) {
                res.status(404).json({ message: "User not found" });
                return;
            }
            res.status(200).json(updatedUser);
        } catch (error) {
            console.log(error);
            next(error);
        }
    }

    @ControllerErrorHandler()
    async delete(req: Request, res: Response, next: NextFunction): Promise<Response> {
        try {
            const userId = Number(req.params.id);
            const deletedUser = await userService.delete(userId);
            if (!deletedUser) {
                res.status(404).json({ message: "User not found" });
                return;
            }
            res.status(200).json(deletedUser);
        } catch (error) {
            console.log(error);
            next(error);
        }
    }
}

const userController = new UserController();
export default userController;

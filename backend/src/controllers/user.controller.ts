import { Request, Response, NextFunction } from "express";
import userService from "../services/user.service";
import ControllerErrorHandler from "./tools/controllerErrorHandler";

class UserController {
    @ControllerErrorHandler()
    async create(req: Request, res: Response, next: NextFunction): Promise<Response> {
        // try {
        const newUser = await userService.create(req.body);
        return res.status(201).json(newUser);
        // } catch (error: any) {
        //     console.log(error);
        //     next(error);
        // }
    }

    async getAll(req: Request, res: Response, next: NextFunction): Promise<Response> {
        // try {
            const users = await userService.getAll(req.query);
            return res.status(204).json(users);
        // } catch (error) {
        //     console.log(error);
        //     next(error);
        // }
    }

    async getOne(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const userId = Number(req.params.id);
            const user = await userService.getOne(userId);
            if (!user) {
                res.status(404).json({ message: "User not found" });
                return;
            }
            res.status(200).json(user);
        } catch (error) {
            console.log(error);
            next(error);
        }
    }



    async update(req: Request, res: Response, next: NextFunction): Promise<void> {
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

    async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
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

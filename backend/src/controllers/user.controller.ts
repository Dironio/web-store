import { Request, Response, NextFunction } from "express";
import userService from "../services/user.service";
import ControllerErrorHandler from "./tools/controllerErrorHandler";

class UserController {
    @ControllerErrorHandler()
    async create(req: Request, res: Response, next: NextFunction): Promise<Response> {
        const candidate = await userService.create(req.body);
        return res.status(201).json(candidate);
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
        const result = await userService.update(req.body);

        if (!result) {
            res.status(404).json({ message: "User not found" });
            return;
        }

        return res.status(200).json(result);
    }

    @ControllerErrorHandler()
    async delete(req: Request, res: Response, next: NextFunction): Promise<Response> {
        const userId = Number(req.params.id);
        const result = await userService.delete(userId);

        if (!result) {
            res.status(404).json({ message: "User not found" });
            return;
        }

        return res.status(200).json(result);
    }
}

const userController = new UserController();
export default userController;

import { NextFunction, Request, Response } from "express";
import ControllerErrorHandler from "./tools/controllerErrorHandler";
import userService from "../services/user.service";

class UserController {
    @ControllerErrorHandler()
    async create(req: Request, res: Response, _: NextFunction): Promise<Response> {
        const user = await userService.create(req.body);
        return res.status(201).json(user);
    }

    @ControllerErrorHandler()
    async getAll(req: Request, res: Response): Promise<Response> {
        const users = await userService.getAll(req.query);
        return res.status(200).json(users);
    }

    @ControllerErrorHandler()
    async getOne(req: Request, res: Response): Promise<Response> {
        const user = await userService.getOne(Number(req.params.id));
        return res.status(200).json(user);
    }

    @ControllerErrorHandler()
    async update(req: Request, res: Response): Promise<Response> {
        const updatedUser = await userService.update(req.body);
        return res.status(200).json(updatedUser);
    }

    @ControllerErrorHandler()
    async delete(req: Request, res: Response): Promise<Response> {
        const deletedUser = await userService.delete(Number(req.params.id));
        return res.status(200).json(deletedUser);
    }
}

const userController = new UserController();
export default userController;

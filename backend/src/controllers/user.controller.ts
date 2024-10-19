import { NextFunction, Request, Response } from "express";
import ControllerErrorHandler from "./tools/controllerErrorHandler";
import userService from "../services/user.service";


class UserController {
    @ControllerErrorHandler()
    async create(req: Request, res: Response, _: NextFunction): Promise<Response> {
        const dto = req.body;
        const result = await userService.create(dto);

        return res.status(201).json(result);
    }

    @ControllerErrorHandler()
    async get(req: Request, res: Response, _: NextFunction): Promise<Response> {
        const dto: GetUsersDto = req.query;
        const result = await userService.get(dto);

        return res.status(200).json(result);
    }

    @ControllerErrorHandler()
    async getCurrent(req: Request, res: Response, _: NextFunction): Promise<Response> {
        const tokenPayload: TokenPayload = res.locals.tokenPayload;
        const result = await userService.getCurrent(tokenPayload.id);

        return res.json(result);
    }

    @ControllerErrorHandler()
    async getCountries(req: Request, res: Response, _: NextFunction): Promise<Response> {
        const countries = await userService.getCountries();

        return res.json(countries);
    }

    @ControllerErrorHandler()
    async getRegions(req: Request, res: Response, _: NextFunction): Promise<Response> {
        const countryId = req.query.countryId ? Number(req.query.countryId) : undefined;
        const regions = await userService.getRegions(countryId);

        return res.json(regions);
    }

    @ControllerErrorHandler()
    async getRoles(req: Request, res: Response, _: NextFunction): Promise<Response> {
        const roles = await userService.getRoles();

        return res.json(roles);
    }

    @ControllerErrorHandler()
    async getStatuses(req: Request, res: Response, _: NextFunction): Promise<Response> {
        const statuses = await userService.getStatuses();

        return res.json(statuses);
    }
}

const userController = new UserController();

export default userController;
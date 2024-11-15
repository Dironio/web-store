import { NextFunction, Request, Response } from "express";
import ControllerErrorHandler from "./tools/controllerErrorHandler";
import analyticService from "../services/analytic.service";


class AnalyticController {
    @ControllerErrorHandler()
    async create(req: Request, res: Response, next: NextFunction): Promise<Response> {
        const result = await analyticService.create(req.body);
        return res.status(201).json(result);
    }

    @ControllerErrorHandler()
    async getAll(req: Request, res: Response, next: NextFunction): Promise<Response> {
        const result = await analyticService.getAll();
        return res.status(201).json(result);
    }

    @ControllerErrorHandler()
    async getOne(req: Request, res: Response, next: NextFunction): Promise<Response> {
        const result = await analyticService.getOne(Number(req.params.id));
        return res.status(201).json(result);
    }

    @ControllerErrorHandler()
    async update(req: Request, res: Response, next: NextFunction): Promise<Response> {
        const result = await analyticService.update(req.body);
        return res.status(201).json(result);
    }

    @ControllerErrorHandler()
    async delete(req: Request, res: Response, next: NextFunction): Promise<Response> {
        const result = await analyticService.delete(Number(req.params.id));
        return res.status(201).json(result);
    }
}

const analyticController = new AnalyticController();
export default analyticController;
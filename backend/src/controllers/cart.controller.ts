import { NextFunction, Request, Response } from "express";
import cartService from "../services/cart.service";
import ControllerErrorHandler from "./tools/controllerErrorHandler";


class CartController {
    @ControllerErrorHandler()
    async create(req: Request, res: Response, next: NextFunction): Promise<Response> {
        try {
            const result = await cartService.create(req.body);
            return res.status(201).json(result)
        } catch (e: any) {
            console.log(e)
            res.status(500).json(e)
        }
    }

    @ControllerErrorHandler()
    async getAll(req: Request, res: Response, next: NextFunction): Promise<Response> {
        try {
            const result = await cartService.create(req.query);
            return res.status(201).json(result)
        } catch (e: any) {
            console.log(e)
            res.status(500).json(e)
        }
    }

    @ControllerErrorHandler()
    async getOne(req: Request, res: Response, next: NextFunction): Promise<Response> {
        try {
            const result = await cartService.create(Number(req.params.id));
            return res.status(201).json(result)
        } catch (e: any) {
            console.log(e)
            res.status(500).json(e)
        }
    }

    @ControllerErrorHandler()
    async update(req: Request, res: Response, next: NextFunction): Promise<Response> {
        try {
            const result = await cartService.create(req.body);
            return res.status(201).json(result)
        } catch (e: any) {
            console.log(e)
            res.status(500).json(e)
        }
    }

    @ControllerErrorHandler()
    async delete(req: Request, res: Response, next: NextFunction): Promise<Response> {
        try {
            const result = await cartService.create(Number(req.params.id));
            return res.status(201).json(result)
        } catch (e: any) {
            console.log(e)
            res.status(500).json(e)
        }
    }
}

const cartController = new CartController();
export default cartController;
import { NextFunction, Request, Response } from "express";
import cartService from "../services/cart.service";
import ControllerErrorHandler from "./tools/controllerErrorHandler";


class CartController {
    @ControllerErrorHandler()
    async create(req: Request, res: Response, next: NextFunction): Promise<Response> {
        const result = await cartService.create(req.body);
        return res.status(201).json(result)
    }

    @ControllerErrorHandler()
    async getAll(req: Request, res: Response, next: NextFunction): Promise<Response> {
        const result = await cartService.getAll();
        return res.status(201).json(result)
    }

    @ControllerErrorHandler()
    async getOne(req: Request, res: Response, next: NextFunction): Promise<Response> {
        const result = await cartService.getOne(Number(req.params.id));
        return res.status(201).json(result)
    }

    @ControllerErrorHandler()
    async update(req: Request, res: Response, next: NextFunction): Promise<Response> {
        const result = await cartService.update(req.body);
        return res.status(201).json(result)
    }

    @ControllerErrorHandler()
    async delete(req: Request, res: Response, next: NextFunction): Promise<Response> {
        const result = await cartService.delete(Number(req.params.id));
        return res.status(201).json(result)
    }


    //


    @ControllerErrorHandler()
    async createItem(req: Request, res: Response, next: NextFunction): Promise<Response> {
        const result = await cartService.createItem(req.body);
        return res.status(201).json(result)
    }

    @ControllerErrorHandler()
    async getAllItem(req: Request, res: Response, next: NextFunction): Promise<Response> {
        const result = await cartService.getAllItem();  //и в остальных
        return res.status(201).json(result)
    }

    @ControllerErrorHandler()
    async getOneItem(req: Request, res: Response, next: NextFunction): Promise<Response> {
        const result = await cartService.getOneItem(Number(req.params.id));
        return res.status(201).json(result)
    }

    @ControllerErrorHandler()
    async updateItem(req: Request, res: Response, next: NextFunction): Promise<Response> {
        const result = await cartService.updateItem(req.body);
        return res.status(201).json(result)
    }

    @ControllerErrorHandler()
    async deleteItem(req: Request, res: Response, next: NextFunction): Promise<Response> {
        const result = await cartService.deleteItem(Number(req.params.id));
        return res.status(201).json(result)
    }
}

const cartController = new CartController();
export default cartController;
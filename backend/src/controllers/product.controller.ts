import { NextFunction, Request, Response } from "express";
import productService from "../services/product.service";
import ControllerErrorHandler from "./tools/controllerErrorHandler";


class ProductController {
    @ControllerErrorHandler()
    async create(req: Request, res: Response, next: NextFunction): Promise<Response> {
        const result = await productService.create(req.body)
        return res.status(201).json(result)
    }

    @ControllerErrorHandler()
    async getAll(req: Request, res: Response, next: NextFunction): Promise<Response> {
        const result = await productService.getAll(req.query);
        return res.status(200).json(result);
    }

    @ControllerErrorHandler()
    async getOne(req: Request, res: Response, next: NextFunction): Promise<Response> {

        const result = await productService.getOne(Number(req.params.id));
        return res.status(200).json(result);
    }

    @ControllerErrorHandler()
    async update(req: Request, res: Response, next: NextFunction): Promise<Response> {
        const result = await productService.update(req.body);
        return res.status(200).json(result);
    }

    @ControllerErrorHandler()
    async delete(req: Request, res: Response, next: NextFunction): Promise<Response> {
        const result = await productService.delete(Number(req.params.id));
        return res.status(200).json(result);
    }
}

const productController = new ProductController();
export default productController;
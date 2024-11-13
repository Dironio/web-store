import { NextFunction, Request, Response } from "express";
import productService from "../services/product.service";
import ControllerErrorHandler from "./tools/controllerErrorHandler";


class ProductController {
    @ControllerErrorHandler()
    async create(req: Request, res: Response, next: NextFunction): Promise<Response> {
        try {
            const order = await productService.create(req.body)
            return res.status(201).json(order)
        } catch (e) {
            console.log(e)
            res.status(500).json(e)
        }
    }

    @ControllerErrorHandler()
    async getAll(req: Request, res: Response, next: NextFunction): Promise<Response> {
        try {
            const orders = await productService.getAll(req.query);
            return res.status(200).json(orders);
        }
        catch (e: any) {
            console.log(e);
            res.status(500).json(e);
        }
    }

    @ControllerErrorHandler()
    async getOne(req: Request, res: Response, next: NextFunction): Promise<Response> {
        try {
            const order = await productService.getOne(Number(req.params.id));
            return res.status(200).json(order);
        }
        catch (e: any) {
            console.log(e);
            res.status(500).json(e)
        }
    }

    @ControllerErrorHandler()
    async update(req: Request, res: Response, next: NextFunction): Promise<Response> {
        try {
            const order = await productService.update(req.body);
            return res.status(200).json(order);
        }
        catch (e: any) {
            console.log(e);
            res.status(500).json(e)
        }
    }

    @ControllerErrorHandler()
    async delete(req: Request, res: Response, next: NextFunction): Promise<Response> {
        try {
            const order = await productService.delete(Number(req.params.id));
            return res.status(200).json(order);
        }
        catch (e: any) {
            console.log(e);
            res.status(500).json(e)
        }
    }


}

const productController = new ProductController();
export default productController;
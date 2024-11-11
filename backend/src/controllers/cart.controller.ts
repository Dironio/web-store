import { NextFunction, Request, Response } from "express";
import cartService from "../services/cart.service";


class CartController {
    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const result = await cartService.create(req.body);
            return res.status(201).json(result)
        } catch (e: any) {
            console.log(e)
            res.status(500).json(e)
        }
    }

    async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const result = await cartService.create(req.query);
            return res.status(201).json(result)
        } catch (e: any) {
            console.log(e)
            res.status(500).json(e)
        }
    }

    async getOne(req: Request, res: Response, next: NextFunction) {
        try {
            const result = await cartService.create(Number(req.params.id));
            return res.status(201).json(result)
        } catch (e: any) {
            console.log(e)
            res.status(500).json(e)
        }
    }

    async update(req: Request, res: Response, next: NextFunction) {
        try {
            const result = await cartService.create(req.body);
            return res.status(201).json(result)
        } catch (e: any) {
            console.log(e)
            res.status(500).json(e)
        }
    }

    async delete(req: Request, res: Response, next: NextFunction) {
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
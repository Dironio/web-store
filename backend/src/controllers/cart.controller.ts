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

    @ControllerErrorHandler()
    async getCount(req: Request, res: Response, next: NextFunction): Promise<Response> {
        const result = await cartService.getCount(Number(req.params.id));
        return res.status(201).json(result);
    }

    //

    // @ControllerErrorHandler()
    // async deleteCartByUserId(req: Request, res: Response, next: NextFunction): Promise<Response> {
    //     const result = await cartService.deleteCartByUserId(Number(req.params.id));
    //     return res.status(200).json(result);
    // }

    @ControllerErrorHandler()
    async addItemToCart(req: Request, res: Response, next: NextFunction): Promise<Response> {
        const userId = Number(req.params.id);
        const productId = req.body;

        if (!userId) {
            return res.status(401).json({ error: "Пользователь не авторизован" });
        }

        if (!productId) {
            return res.status(400).json({ error: "Отсутствует ID товара" });
        }

        const item = await cartService.addItemToCart(userId, productId);
        return res.status(201).json(item);
    }

    @ControllerErrorHandler()
    async getCartCount(req: Request, res: Response, next: NextFunction): Promise<Response> {
        const userId = Number(req.params.id);

        if (!userId) {
            return res.status(200).json({ count: 0 });
        }

        const count = await cartService.getCartTotalItems(userId);
        return res.status(200).json(count);
    }

    @ControllerErrorHandler()
    async getCartItems(req: Request, res: Response, next: NextFunction): Promise<Response> {
        const userId = Number(req.params.id);

        if (!userId) {
            return res.status(401).json({ error: "Пользователь не авторизован" });
        }

        const items = await cartService.getCartItems(userId);
        return res.status(200).json(items);
    }


    @ControllerErrorHandler()
    async removeItemFromCart(req: Request, res: Response, next: NextFunction): Promise<Response> {
        const userId = Number(req.params.id);
        const productId = req.body;

        if (!userId) {
            return res.status(401).json({ error: "Пользователь не авторизован" });
        }

        if (!productId) {
            return res.status(400).json({ error: "Отсутствует ID товара" });
        }

        const item = await cartService.removeItemFromCart(userId, productId);
        return res.status(200).json(item);
    }
}


const cartController = new CartController();
export default cartController;
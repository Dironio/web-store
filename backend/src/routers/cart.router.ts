import { Router } from "express";
import cartController from "../controllers/cart.controller";


const cartRouter: Router = Router();

cartRouter.post('/', cartController.create);
cartRouter.get('/', cartController.getAll);
cartRouter.get('/:id', cartController.getOne);
cartRouter.patch('/', cartController.update);
cartRouter.delete('/:id', cartController.delete);

export default cartRouter;
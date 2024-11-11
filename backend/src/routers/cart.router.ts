import { Router } from "express";
import cartController from "../controllers/cart.controller";


const cartRouter: Router = Router();

cartRouter.post('/create', cartController.create);
cartRouter.get('/create', cartController.getAll);
cartRouter.get('/create', cartController.getOne);
cartRouter.patch('/create', cartController.update);
cartRouter.delete('/create', cartController.delete);

export default cartRouter;
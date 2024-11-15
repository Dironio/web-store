import { Router } from "express";
import cartController from "../controllers/cart.controller";


const cartRouter: Router = Router();

cartRouter.post('/', cartController.create);
cartRouter.get('/', cartController.getAll);
cartRouter.get('/:id', cartController.getOne);
cartRouter.patch('/', cartController.update);
cartRouter.delete('/:id', cartController.delete);



cartRouter.post('/items/', cartController.createItem);
cartRouter.post('/items/', cartController.getAllItem);
cartRouter.post('/items/:id', cartController.getOneItem);
cartRouter.post('/items/', cartController.updateItem);
cartRouter.post('/items/:id', cartController.deleteItem);

export default cartRouter;
import { Router } from "express";
import cartController from "../controllers/cart.controller";


const cartRouter: Router = Router();

cartRouter.post('/', cartController.create);
cartRouter.get('/', cartController.getAll);
cartRouter.patch('/', cartController.update);
cartRouter.delete('/:id', cartController.delete);

cartRouter.post('/items/', cartController.createItem);
cartRouter.get('/items/', cartController.getAllItem);
cartRouter.patch('/items/', cartController.updateItem);
cartRouter.delete('/items/:id', cartController.deleteItem);


cartRouter.get('/items/:id', cartController.getOneItem);
cartRouter.get('/count/:id', cartController.getCount)
cartRouter.get('/:id', cartController.getOne);

export default cartRouter;
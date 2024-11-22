import { Router } from "express";
import cartController from "../controllers/cart.controller";
import authCheck from "src/middlewares/auth.middleware";


const cartRouter: Router = Router();

cartRouter.post('/', authCheck, cartController.create);
cartRouter.get('/', cartController.getAll);
cartRouter.patch('/', authCheck, cartController.update);
cartRouter.delete('/:id', authCheck, cartController.delete);

cartRouter.post('/items/', authCheck, cartController.createItem);
cartRouter.get('/items/', cartController.getAllItem);
cartRouter.patch('/items/', authCheck, cartController.updateItem);
cartRouter.delete('/items/:id', authCheck, cartController.deleteItem);


cartRouter.get('/items/:id', authCheck, cartController.getOneItem);
cartRouter.get('/count/:id', authCheck, cartController.getCount)
cartRouter.get('/:id', authCheck, cartController.getOne);

export default cartRouter;
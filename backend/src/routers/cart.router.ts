import { Router } from "express";
import cartController from "../controllers/cart.controller";
import authCheck from "../middlewares/auth.middleware";


const cartRouter: Router = Router();

cartRouter.post('/', authCheck, cartController.create);
cartRouter.get('/', cartController.getAll);
cartRouter.patch('/', authCheck, cartController.update);
cartRouter.delete('/:id', authCheck, cartController.delete);

cartRouter.post("/add", authCheck, cartController.addItemToCart);
cartRouter.post("/remove", authCheck, cartController.removeItemFromCart);
cartRouter.get("/count", authCheck, cartController.getCartCount);
cartRouter.get("/items/", authCheck, cartController.getCartItems);

// cartRouter.get('/count/:id', authCheck, cartController.getCount)
// cartRouter.get('/:id', authCheck, cartController.getOne);

export default cartRouter;
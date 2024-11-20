import { Router } from "express";
import productController from "../controllers/product.controller";


const productRouter: Router = Router();

productRouter.post('/', productController.create);
productRouter.get('/', productController.getAll);
productRouter.patch('/', productController.update);
productRouter.delete('/:id', productController.delete)

productRouter.get('/discount', productController.getDiscount)
productRouter.get('/:id', productController.getOne);

export default productRouter;
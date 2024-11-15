import { Router } from "express";
import productController from "../controllers/product.controller";


const productRouter: Router = Router();

productRouter.post('/', productController.create);
productRouter.get('/', productController.getAll);
productRouter.get('/:id', productController.getOne)
productRouter.patch('/', productController.update);
productRouter.delete('/:id', productController.delete)

export default productRouter;
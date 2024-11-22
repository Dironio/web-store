import { Router } from "express";
import productController from "../controllers/product.controller";
import authCheck from "../middlewares/auth.middleware";


const productRouter: Router = Router();

productRouter.post('/', authCheck, productController.create);
productRouter.get('/', productController.getAll);
productRouter.patch('/', authCheck, productController.update);
productRouter.delete('/:id', authCheck, productController.delete)

productRouter.get('/discount', productController.getDiscount)
productRouter.get('/personal', authCheck, productController.getPersonal)
productRouter.get('/:id', productController.getOne);

export default productRouter;
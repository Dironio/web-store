import { Router } from "express";
import analyticController from "../controllers/analytic.controller";


const analyticRouter: Router = Router();

analyticRouter.post('/', analyticController.create);
analyticRouter.get('/', analyticController.getAll);
analyticRouter.get('/:id', analyticController.getOne);
analyticRouter.patch('/', analyticController.update);
analyticRouter.delete('/:id', analyticController.delete);


export default analyticRouter;
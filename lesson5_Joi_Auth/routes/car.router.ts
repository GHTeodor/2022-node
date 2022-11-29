import {Router} from "express";

import {carController} from "../controllers";
import {carMiddleware} from "../middlewares";

const router = Router();

router.get('/', carController.getAll);
router.post('/', carMiddleware.isBodyValidCreate, carMiddleware.carNormalizer, carController.createOne);

router.get('/:carId', carMiddleware.checkIsCarExist, carController.getById);
router.put('/:carId', carMiddleware.isBodyValidUpdate, carMiddleware.carNormalizer, carMiddleware.checkIsCarExist, carController.updateById);
router.delete('/:carId', carMiddleware.checkIsCarExist, carController.deleteById);

export const carRouter = router;

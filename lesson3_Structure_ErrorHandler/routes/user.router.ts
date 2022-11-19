import {Router} from "express";

import {userController} from "../controllers";
import {userMiddleware} from "../middlewares";

const router = Router();

router.get('/', userController.getAll);
router.get('/:email', userMiddleware.checkIsUserExist, userController.getByEmail);
router.post('/', userController.createOne);
router.put('/:email', userMiddleware.checkIsUserExist, userController.updateByEmail);
router.delete('/:email', userMiddleware.checkIsUserExist, userController.deleteByEmail);

export const userRouter = router;

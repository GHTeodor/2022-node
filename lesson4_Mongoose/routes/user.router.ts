import {Router} from "express";

import {userController} from "../controllers";
import {userMiddleware} from "../middlewares";

const router = Router();

router.get('/', userController.getAll);
router.post('/', userMiddleware.isBodyValidCreate, userMiddleware.userNormalizer, userMiddleware.checkIsEmailUnique, userController.createOne);

router.get('/:userId', userMiddleware.checkIsUserExist, userController.getById);
router.put('/:userId', userMiddleware.isBodyValidUpdate, userMiddleware.userNormalizer, userMiddleware.checkIsUserExist, userController.updateById);
router.delete('/:userId', userMiddleware.checkIsUserExist, userController.deleteById);

export const userRouter = router;

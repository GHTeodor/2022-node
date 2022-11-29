import {Router} from "express";

import {userController} from "../controllers";
import {userMiddleware} from "../middlewares";

const router = Router();

router.get('/', userController.getAll);
router.post('/', userMiddleware.userNormalizer, userMiddleware.isNewUserValid, userMiddleware.isBodyValidCreate, userMiddleware.checkIsEmailUnique, userController.createOne);

router.get('/:userId', userMiddleware.isUserIdValid, userMiddleware.checkIsUserExist, userMiddleware.getUserDynamically('userId', 'params', '_id'), userController.getById);
router.put('/:userId', userMiddleware.isUserIdValid, userMiddleware.userNormalizer, userMiddleware.isEditUserValid, userMiddleware.isBodyValidUpdate, userMiddleware.checkIsUserExist, userMiddleware.getUserDynamically('userId', 'params', '_id'), userController.updateById);
router.delete('/:userId', userMiddleware.isUserIdValid, userMiddleware.checkIsUserExist, userController.deleteById);

export const userRouter = router;

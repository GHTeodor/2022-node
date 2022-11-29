import {Router} from "express";

import {authController} from "../controllers";
import {authMiddleware, userMiddleware} from "../middlewares";

const router = Router();

router.post('/login',
    authMiddleware.isLoginValid,
    userMiddleware.getUserDynamically('email'),
    authController.login);
router.post('/refresh',
    authMiddleware.checkRefreshToken,
    authController.refreshToken);

export const authRouter = router;

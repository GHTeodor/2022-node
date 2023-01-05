import {Request, Response, NextFunction, Router} from "express";

import { ApiError } from "../errors";
import {twilioController} from "../controllers";

const router = Router();

router.get("/", twilioController.send);
router.use('*', (err: ApiError, req: Request, res: Response, next: NextFunction) => {
    res.status(err.status || 500).json({
        message: err.message || 'Unexpected error',
        status: err.status || 500,
        ok: false
    });
});
export const apiRouter = router;

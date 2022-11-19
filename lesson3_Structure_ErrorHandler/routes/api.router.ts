import {NextFunction, Request, Response, Router} from "express";

import {userRouter} from ".";
import {ApiError} from "../errors";

const router = Router();

router.use('/users', userRouter);
router.use('*', (err: ApiError, req: Request, res: Response, next: NextFunction) => {
    res.status(err.status || 500).json({
        message: err.message || 'Unexpected error',
        status: err.status || 500,
        ok: false
    });
});

export const apiRouter = router;

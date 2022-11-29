import {Request, Response, NextFunction} from "express";

import {authValidator} from "../validators";
import {ApiError} from "../errors";

class AuthMiddleware {
    async isLoginValid(req: Request, res: Response, next: NextFunction) {
        try {
            const validate = authValidator.loginValidator.validate(req.body);

            if (validate.error) {
                throw new ApiError(validate.error.message);
            }

            next();
        } catch (e) {
            next(e);
        }
    }
}

export const authMiddleware = new AuthMiddleware();

import {Response, NextFunction} from "express";

import {userService} from "../services";
import {IRequestExtended} from "../interfaces";
import {ApiError} from "../errors";

class UserMiddleware {
    async checkIsUserExist(req: IRequestExtended, res: Response, next: NextFunction) {
        try {
            const {email} = req.params;

            const userByEmail = await userService.getOneByEmail(email);

            if (!userByEmail) {
                throw new ApiError(`User with email: ${email} doesn't exist`, 404);
            }

            req.user = userByEmail;

            next();
        } catch (e) {
            next(e);
        }
    }
}

export const userMiddleware = new UserMiddleware();

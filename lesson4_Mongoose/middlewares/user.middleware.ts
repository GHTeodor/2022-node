import {Response, NextFunction} from "express";

import {IRequestExtended} from "../interfaces";
import {ApiError} from "../errors";
import {userService} from "../services";
import {userNormalizer} from "../helpers";

class UserMiddleware {
    async checkIsUserExist(req: IRequestExtended, res: Response, next: NextFunction) {
        try {
            const {userId} = req.params;

            const userById = await userService.findById(userId);

            if (!userById) {
                throw new ApiError(`User with userId: ${userId} doesn't exist`, 404);
            }

            req.user = userById;

            next();
        } catch (e) {
            next(e);
        }
    }

    async checkIsEmailUnique(req: IRequestExtended, res: Response, next: NextFunction) {
        try {
            const {email} = req.body;

            if (!email) {
                throw new ApiError('Email is not present');
            }

            const userById = await userService.findByParams({email});

            if (userById[0]) {
                throw new ApiError(`User with email: ${email} already exist`, 409);
            }

            next();
        } catch (e) {
            next(e);
        }
    }

    isBodyValidCreate(req: IRequestExtended, res: Response, next: NextFunction) {
        try {
            const {name, age, email} = req.body;
            if (!name || name.length < 3 || typeof name !== 'string') {
                throw new ApiError('Wrong name');
            }

            if (!email || !email.includes('@')) {
                throw new ApiError('Wrong email');
            }
            if (!age || age < 0 || Number.isNaN(+age)) {
                throw new ApiError('Wrong age');
            }

            next();
        } catch (e) {
            next(e);
        }
    }
    isBodyValidUpdate(req: IRequestExtended, res: Response, next: NextFunction) {
        try {
            const {name, age, email} = req.body;
            if (!name || name.length < 3 || typeof name !== 'string') {
                throw new ApiError('Wrong name');
            }

            if (!email || !email.includes('@')) {
                throw new ApiError('Wrong email');
            }
            if (!age || age < 0 || Number.isNaN(+age)) {
                throw new ApiError('Wrong age');
            }

            next();
        } catch (e) {
            next(e);
        }
    }

    userNormalizer(req: IRequestExtended, res: Response, next: NextFunction) {
        try {
            let {name, email} = req.body;

            if (name) req.body.name = userNormalizer.name(name);

            if (email) req.body.email = userNormalizer.email(email);

            next();
        } catch (e) {
            next(e);
        }
    }
}

export const userMiddleware = new UserMiddleware();

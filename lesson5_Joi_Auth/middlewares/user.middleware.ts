import {Request, Response, NextFunction} from "express";

import {IRequestExtended} from "../interfaces";
import {ApiError} from "../errors";
import {userService} from "../services";
import {userNormalizer} from "../helpers";
import {commonValidator, userValidator} from "../validators";


class UserMiddleware {
    async checkIsUserExist(req: IRequestExtended, res: Response, next: NextFunction) {
        try {
            const {userId} = req.params;

            const userById = await userService.findOneByParams({userId});

            if (!userById) {
                throw new ApiError(`User with userId: ${userId} doesn't exist`, 404);
            }

            req.user = userById;

            next();
        } catch (e) {
            next(e);
        }
    }

    getUserDynamically(fieldName: string, from: keyof IRequestExtended = 'body', dbField: string = fieldName) {
        return async (req: IRequestExtended, res: Response, next: NextFunction) => {
            try {
                const fieldToSearch = req[from][fieldName];

                const user = await userService.findOneByParams({[dbField]: fieldToSearch});

                if (!user) {
                    throw new ApiError("User not found", 404);
                }

                req.user = user;

                next();
            } catch (e) {
                next(e);
            }
        }
    };

    async checkIsEmailUnique(req: Request, res: Response, next: NextFunction) {
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

    isBodyValidCreate(req: Request, res: Response, next: NextFunction) {
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

    userNormalizer(req: Request, res: Response, next: NextFunction) {
        try {
            let {name, email} = req.body;

            if (name) req.body.name = userNormalizer.name(name);

            if (email) req.body.email = userNormalizer.email(email);

            next();
        } catch (e) {
            next(e);
        }
    }

    async isNewUserValid(req: Request, res: Response, next: NextFunction) {
        try {
            const validate = userValidator.newUserValidator.validate(req.body);

            if (validate.error) {
                throw new ApiError(validate.error.message);
            }

            req.body = validate.value;

            next();
        } catch (e) {
            next(e);
        }
    }

    async isEditUserValid(req: IRequestExtended, res: Response, next: NextFunction) {
        try {
            const validate = userValidator.editUserValidator.validate(req.body);

            if (validate.error) {
                throw new ApiError(validate.error.message);
            }

            req.body = validate.value;

            next();
        } catch (e) {
            next(e);
        }
    }

    async isUserIdValid(req: Request, res: Response, next: NextFunction) {
        try {
            const {userId} = req.params;

            const validate = commonValidator.idValidator.validate(userId);

            if (validate.error) {
                throw new ApiError(validate.error.message);
            }

            next();
        } catch (e) {
            next(e);
        }
    }
}

export const userMiddleware = new UserMiddleware();

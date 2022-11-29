import {Response, NextFunction} from "express";

import {IRequestExtended} from "../interfaces";
import {oAuthService} from "../services";
import {ApiError} from "../errors";

class AuthController {
    async login(req: IRequestExtended, res: Response, next: NextFunction) {
        try {
            const { user, body } = req;

            console.log(user?.password);

            if (!user?.password) {
                throw new ApiError('No user password',400);
            }

            console.log(user);

            await oAuthService.comparePasswords(body.password, user.password);

            const tokenPair = oAuthService.generateTokenPair({id: user._id});

            await oAuthService.createTokenPair({...tokenPair, _user_id: user._id});

            res.status(201).json({
                user,
                ...tokenPair
            });
        } catch (e) {
            next(e)
        }
    }
}

export const authController = new AuthController();

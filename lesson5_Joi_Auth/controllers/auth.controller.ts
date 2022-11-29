import {Response, NextFunction} from "express";

import {IRequestExtended} from "../interfaces";
import {oAuthService} from "../services";
import {ApiError} from "../errors";
import {oAuthModel} from "../database";

class AuthController {
    async login(req: IRequestExtended, res: Response, next: NextFunction) {
        try {
            const { user, body } = req;

            if (!user?.password) {
                throw new ApiError('No user password',400);
            }

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

    async refreshToken(req: IRequestExtended, res: Response, next: NextFunction) {
        try {
            const refreshToken = req.tokenInfo?.refreshToken;
            const _user_id = req.tokenInfo?._user_id;

            await oAuthModel.deleteMany({refreshToken});

            const tokenPair = oAuthService.generateTokenPair({id: _user_id});

            await oAuthModel.create({...tokenPair, _user_id});

            res.status(201).json(tokenPair);
        } catch (e) {
            next(e);
        }
    }
}

export const authController = new AuthController();

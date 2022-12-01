import {Request, Response, NextFunction} from "express";

import {authValidator} from "../validators";
import {ApiError} from "../errors";
import {constant} from "../configs";
import {oAuthService} from "../services";
import {oAuthModel} from "../database";
import {IRequestExtended} from "../interfaces";

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

    async checkAccessToken(req: Request, res: Response, next: NextFunction) {
        try {
            const accessToken = req.get(constant.AUTHORIZATION);

            if (!accessToken) {
                throw new ApiError("No token", 401);
            }

            await oAuthService.checkToken(accessToken);

            const tokenInfo = await oAuthModel.findOne({accessToken});

            if (!tokenInfo) {
                throw new ApiError("Token is not valid", 401);
            }

            next();
        } catch (e) {
            next(e);
        }
    }

    async checkRefreshToken(req: IRequestExtended, res: Response, next: NextFunction) {
        try {
            const refreshToken = req.get(constant.AUTHORIZATION);

            if (!refreshToken) {
                throw new ApiError("No token", 401);
            }

            await oAuthService.checkToken(refreshToken, constant.REFRESH_TOKEN);

            const tokenInfo = await oAuthModel.findOne({refreshToken});

            if (!tokenInfo) {
                throw new ApiError("Token is not valid", 401);
            }

            req.tokenInfo = tokenInfo;

            next();
        } catch (e) {
            next(e);
        }
    }
}

export const authMiddleware = new AuthMiddleware();

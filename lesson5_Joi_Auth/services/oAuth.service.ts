import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import {ApiError} from "../errors";
import {config} from "../configs";
import {oAuthModel} from "../database";
import {IToken} from "../interfaces";

class OAuthService {
    hashPassword = (password: string) => bcrypt.hash(password, 10);

    async comparePasswords(password: string, hash: string) {
        const isPasswordSame = await bcrypt.compare(password, hash);

        if (!isPasswordSame) throw new ApiError("Wrong email or password", 404);
    }

    generateTokenPair(dataToSign: object) {
        const accessToken = jwt.sign(dataToSign, config.ACCESS_TOKEN_KEY, {expiresIn: config.ACCESS_EXPIRES_IN});
        const refreshToken = jwt.sign(dataToSign, config.REFRESH_TOKEN_KEY, {expiresIn: config.REFRESH_EXPIRES_IN});

        return {
            accessToken,
            refreshToken
        }
    }

    async createTokenPair(param: IToken) {
        await oAuthModel.create(param);
    }
}

export const oAuthService = new OAuthService();

import Joi from "joi";
import {JoiRegexp} from "../configs";

export const authValidator = {
    loginValidator: Joi.object({
        email: Joi.string().trim().lowercase().regex(JoiRegexp.EMAIL).required(),
        password: Joi.string().regex(JoiRegexp.PASSWORD).required(),
    }),
};

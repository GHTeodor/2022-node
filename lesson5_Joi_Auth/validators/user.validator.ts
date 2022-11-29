import Joi from "joi";

import {JoiRegexp} from "../configs";

export const userValidator = {
    newUserValidator: Joi.object({
            name: Joi.string().trim().min(2).max(100).required(),
            email: Joi.string().trim().lowercase().regex(JoiRegexp.EMAIL).required(),
            password: Joi.string().regex(JoiRegexp.PASSWORD).required(),
            age: Joi.number().integer().min(1).max(125),
        }),

    editUserValidator: Joi.object({
            name: Joi.string().trim().min(2).max(100).optional(),
            email: Joi.string().trim().lowercase().regex(JoiRegexp.EMAIL).optional(),
            password: Joi.string().regex(JoiRegexp.PASSWORD).optional(),
            age: Joi.number().integer().min(1).max(125).optional(),
        }),
};

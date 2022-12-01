import Joi from "joi";

import {JoiRegexp} from "../configs";

export const commonValidator = {
    idValidator: Joi.string().regex(JoiRegexp.MONGO_ID),
}

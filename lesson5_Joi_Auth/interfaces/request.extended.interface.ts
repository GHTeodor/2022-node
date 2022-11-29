import {Request} from "express";

import { IUser, ICar } from ".";

export interface IRequestExtended extends Request {
    user?: IUser;
    car?: ICar;
}

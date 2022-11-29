import {Request} from "express";

import {IUser, ICar, IToken} from ".";

export interface IRequestExtended extends Request {
    user?: IUser;
    car?: ICar;
    tokenInfo?: Partial<IToken>;
}

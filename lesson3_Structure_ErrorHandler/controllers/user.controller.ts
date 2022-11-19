import {NextFunction, Request, Response} from "express";

import {userService} from "../services";
import {IRequestExtended} from "../interfaces";

class UserController {
    async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            return res.json(await userService.getAll());
        } catch (e) {
            next(e);
        }
    }

    async getByEmail(req: IRequestExtended, res: Response, next: NextFunction) {
        try {
            return res.json(req.user);
        } catch (e) {
            next(e);
        }
    }

    async createOne(req: Request, res: Response, next: NextFunction) {
        try {
            return res.json(await userService.createOne(req.body));
        } catch (e) {
            next(e);
        }
    }

    async updateByEmail(req: Request, res: Response, next: NextFunction) {
        try {
            const {email} = req.params;
            return res.json(await userService.updateByEmail(email, req.body));
        } catch (e) {
            next(e);
        }
    }


    async deleteByEmail(req: Request, res: Response, next: NextFunction) {
        try {
            const {email} = req.params;
            res.json(await userService.deleteByEmail(email));
        } catch (e: any) {
            next(e);
        }
    }
}

export const userController = new UserController();

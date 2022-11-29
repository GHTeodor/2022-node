import {NextFunction, Request, Response} from "express";

import {IRequestExtended} from "../interfaces";
import {oAuthService, userService} from "../services";

class UserController {
    async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const users = await userService.findByParams();

            res.json(users);
        } catch (e) {
            next(e);
        }
    }

    async getById(req: IRequestExtended, res: Response, next: NextFunction) {
        try {
            res.json(req.user);
        } catch (e) {
            next(e);
        }
    }

    async createOne(req: Request, res: Response, next: NextFunction) {
        try {
            const hashPassword = await oAuthService.hashPassword(req.body.password);

            const newUser = await userService.createOne({...req.body, password: hashPassword});

            res.status(201).json(newUser);
        } catch (e) {
            next(e);
        }
    }

    async updateById(req: Request, res: Response, next: NextFunction) {
        try {
            const newUserInfo = req.body;
            const {userId} = req.params;

            const updatedUser = await userService.updateById(userId, newUserInfo);

            res.status(201).json(updatedUser);
        } catch (e) {
            next(e);
        }
    }


    async deleteById(req: Request, res: Response, next: NextFunction) {
        try {
            const {userId} = req.params;
            await userService.deleteById(userId);

            res.sendStatus(204);
        } catch (e: any) {
            next(e);
        }
    }
}

export const userController = new UserController();

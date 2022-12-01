import {Response, NextFunction} from "express";

import {IRequestExtended} from "../interfaces";
import {ApiError} from "../errors";
import {carService} from "../services";
import {carNormalizer} from "../helpers";

class CarMiddleware {
    async checkIsCarExist(req: IRequestExtended, res: Response, next: NextFunction) {
        try {
            const {carId} = req.params;

            const carById = await carService.findById(carId);

            if (!carById) {
                throw new ApiError(`User with userId: ${carId} doesn't exist`, 404);
            }

            req.car = carById;

            next();
        } catch (e) {
            next(e);
        }
    }

    isBodyValidCreate(req: IRequestExtended, res: Response, next: NextFunction) {
        try {
            const {model, year, price} = req.body;
            if (!model || model.length < 3 || typeof model !== 'string') {
                throw new ApiError('Wrong model');
            }

            if (!year || year < 0 || Number.isNaN(+year)) {
                throw new ApiError('Wrong year');
            }

            if (!price || price < 0 || Number.isNaN(+price)) {
                throw new ApiError('Wrong price');
            }

            next();
        } catch (e) {
            next(e);
        }
    }
    isBodyValidUpdate(req: IRequestExtended, res: Response, next: NextFunction) {
        try {
            const {model, year, price} = req.body;
            if (!model || model.length < 3 || typeof model !== 'string') {
                throw new ApiError('Wrong model');
            }

            if (!year || year < 0 || Number.isNaN(+year)) {
                throw new ApiError('Wrong year');
            }

            if (!price || price < 0 || Number.isNaN(+price)) {
                throw new ApiError('Wrong price');
            }

            next();
        } catch (e) {
            next(e);
        }
    }

    carNormalizer(req: IRequestExtended, res: Response, next: NextFunction) {
        try {
            if (req.body.model) {
                req.body.model = carNormalizer.model(req.body.model);
            }

            next();
        } catch (e) {
            next(e);
        }
    }
}

export const carMiddleware = new CarMiddleware();

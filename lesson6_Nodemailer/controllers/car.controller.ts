import {NextFunction, Request, Response} from "express";

import {IRequestExtended} from "../interfaces";
import {carService} from "../services";

class CarController {
    async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const cars = await carService.findByParams();

            res.json(cars);
        } catch (e) {
            next(e);
        }
    }

    async getById(req: IRequestExtended, res: Response, next: NextFunction) {
        try {
            res.json(req.car);
        } catch (e) {
            next(e);
        }
    }

    async createOne(req: Request, res: Response, next: NextFunction) {
        try {
            const newCar = await carService.createOne(req.body);

            res.json(newCar);
        } catch (e) {
            next(e);
        }
    }

    async updateById(req: Request, res: Response, next: NextFunction) {
        try {
            const newCarInfo = req.body;
            const {carId} = req.params;

            const updatedCar = await carService.updateById(carId, newCarInfo);

            res.status(201).json(updatedCar);
        } catch (e) {
            next(e);
        }
    }


    async deleteById(req: Request, res: Response, next: NextFunction) {
        try {
            const {carId} = req.params;
            await carService.deleteById(carId);

            res.sendStatus(204);
        } catch (e: any) {
            next(e);
        }
    }
}

export const carController = new CarController();

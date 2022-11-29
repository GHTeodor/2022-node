import {carModel} from "../database";
import {ICar} from "../interfaces";

class CarService {
    async findByParams(params: object = {}) {
        return carModel.find(params)/*.populate('user')*/;
    }

    async findById(id: string) {
        return carModel.findById(id).populate('user');
    }

    async createOne(newCar: ICar) {
        return carModel.create(newCar);
    }

    async updateById(id: string, carForUpdate: ICar) {
        return carModel.findByIdAndUpdate(id, carForUpdate);
    }

    async deleteById(id: string) {
        return carModel.findByIdAndDelete(id);
    }
}

export const carService = new CarService();

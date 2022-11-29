import {userModel} from "../database";
import {IUser} from "../interfaces";

class UserService {
    async findByParams(params: object = {}) {
        return userModel.find(params);
    }

    async findOneByParams(params: object) {
        return userModel.findOne(params);
    }

    async findByIdWithCars(userId: string) {
        return userModel.aggregate([
            {
                $match: {_id: userId},
            },
            {
                $lookup: {
                    from: 'cars',
                    localField: '_id',
                    foreignField: 'user',
                    as: 'cars'
                },
            }
        ]);
    }

    async findById(id: string) {
        return userModel.findById(id);
    }

    async createOne(newUser: IUser) {
        return userModel.create(newUser);
    }

    async updateById(id: string, userForUpdate: IUser) {
        return userModel.findByIdAndUpdate(id, userForUpdate);
    }

    async deleteById(id: string) {
        return userModel.findByIdAndDelete(id);
    }
}

export const userService = new UserService();

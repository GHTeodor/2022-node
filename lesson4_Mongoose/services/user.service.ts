import {userModel} from "../database";
import {IUser} from "../interfaces";

class UserService {
    async findByParams(params: object = {}) {
        return userModel.find(params);
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

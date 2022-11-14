import fs from "fs/promises";
import path from "path";

import {IUser} from "../interfaces/user.interface";

const pathToUsersDb = path.join(process.cwd(), 'json_db', 'users.json');

class UserService {

    async getAll(): Promise<IUser[]> {
        const data = await fs.readFile(pathToUsersDb);
        return JSON.parse(data.toString());
    }

    async getOneByEmail(email: string): Promise<IUser> {
        const data = await fs.readFile(pathToUsersDb);
        return JSON.parse(data.toString()).find((u: IUser) => u.email === email);
    }

    async createOne(user: IUser): Promise<IUser> {
        const data = await fs.readFile(pathToUsersDb);
        const users = JSON.parse(data.toString());
        users.push(user);

        if (user.email) {
            await fs.appendFile(pathToUsersDb, JSON.stringify(users), {flag: 'w'});
        }

        return user;
    }

    async updateByEmail(email: string, user: IUser): Promise<IUser | string> {
        const deleted = await this.deleteByEmail(email);
        if (deleted.endsWith('successfully')) {
            await this.createOne(user);

            return user;
        }
        return deleted;
    }

    async deleteByEmail(email: string): Promise<string> {
        const users = await this.getAll();
        const index = users.findIndex(u => u.email === email);

        users.splice(index, 1);

        if (users && index >= 0) {
            await fs.appendFile(pathToUsersDb, JSON.stringify(users), {flag: 'w'});
            return `User with email: ${email} deleted successfully`;
        }

        return `User with email: ${email} doesn't exist`;
    }
}

export default new UserService();

import path from "path";
import dotenv from 'dotenv';

dotenv.config({path: path.join(process.cwd(), 'example.env')});

export const config = {
    PORT: process.env.PORT || 5500,
};

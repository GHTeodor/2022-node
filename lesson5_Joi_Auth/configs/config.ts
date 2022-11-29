import dotenv from 'dotenv';

dotenv.config(/*{path: path.join(process.cwd(), 'example.env')}*/);

export const config = {
    PORT: process.env.PORT || 5500,
    MONGO_DB: process.env.MONGO_DB || 'mongodb://localhost:27017/node-june2022',

    ACCESS_TOKEN_KEY: process.env.ACCESS_TOKEN_KEY || 'SUPER_SECRET_ACCESS_TOKEN_KEY',
    REFRESH_TOKEN_KEY: process.env.REFRESH_TOKEN_KEY || 'SUPER_SECRET_REFRESH_TOKEN_KEY',
    ACCESS_EXPIRES_IN: process.env.ACCESS_EXPIRES_IN || '1h',
    REFRESH_EXPIRES_IN: process.env.REFRESH_EXPIRES_IN || '7d'
};

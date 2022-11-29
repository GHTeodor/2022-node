import dotenv from 'dotenv';

dotenv.config(/*{path: path.join(process.cwd(), 'example.env')}*/);

export const config = {
    PORT: process.env.PORT || 5500,
    MONGO_DB: process.env.MONGO_DB || 'mongodb://localhost:27017/node-june2022'
};

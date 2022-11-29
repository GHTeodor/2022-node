import express from 'express';
import mongoose from 'mongoose';

import {apiRouter} from "./routes/api.router";
import {config} from "./configs";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(apiRouter);

app.listen(config.PORT, async () => {
    console.log(`Server has been started on http://localhost:${config.PORT}/users 🚀🚀🚀`);

    await mongoose.connect(config.MONGO_DB)
        .then(() => console.log('Database connected'))
        .catch((error) => console.error(error));
});

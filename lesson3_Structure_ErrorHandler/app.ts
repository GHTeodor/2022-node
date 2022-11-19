import express from 'express';

import {apiRouter} from "./routes/api.router";
import {config} from "./configs";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(apiRouter);

const {PORT} = config;
app.listen(PORT, () => console.log(`Server has been started on http://localhost:${PORT}/users 🚀🚀🚀`));

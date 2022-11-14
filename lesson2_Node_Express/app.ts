import express from 'express';

import {apiRouter} from "./routes/apiRouter";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/users', apiRouter);

const PORT: number = 5200;
app.listen(PORT, () => console.log(`Server has been started on http://localhost:${PORT}/users 🚀🚀🚀`));

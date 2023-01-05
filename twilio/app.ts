import express from 'express';

import {config} from "./configs";
import {apiRouter} from "./routes";

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(apiRouter);

app.listen(config.PORT, () => console.log(`Server has been started on http://localhost:${config.PORT}/ 🚀🚀🚀`));

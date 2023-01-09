const express = require('express');
const fileUpload  = require('express-fileupload');
require('dotenv').config();

const configs = require('./configs/config');
const apiRouter = require("./routes/apiRouter");

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('static'));

app.use(fileUpload());

app.use(apiRouter);

app.listen(configs.PORT, async () => console.log(`Server has been started on http://localhost:${configs.PORT} 🚀🚀🚀`));

const express = require('express');
require('./db/mongoose');
const path = require('path');
const process = require('process');
const helmet = require('helmet');

const userRouter = require('./routers/user');

const app = express();
const port = process.env.PORT || 3000;


app.use(helmet());
app.use(express.json());
app.use(userRouter);




app.listen(port, () => {
    console.log('server is listening on port:' + port)
});

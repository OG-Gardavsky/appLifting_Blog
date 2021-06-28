const express = require('express');
require('./db/mongoose');
const path = require('path');
const process = require('process');
const helmet = require('helmet');

const userRouter = require('./routers/user');
const articleRouter = require('./routers/article');
const commentRouter = require('./routers/comment');
const commentVotesRouter = require('./routers/commentVotes');

const app = express();
const port = process.env.PORT || 3000;


app.use(helmet());
app.use(express.json());
app.use(userRouter);
app.use(articleRouter);
app.use(commentRouter);
app.use(commentVotesRouter);




app.listen(port, () => {
    console.log('server is listening on port:' + port)
});

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
const publicDirectory = path.join(__dirname, '../../client/dist');


//this is commented out - to be able to download bootstrap
// app.use(helmet.contentSecurityPolicy());
// app.use(helmet.referrerPolicy());
app.use(helmet.dnsPrefetchControl());
app.use(helmet.expectCt());
app.use(helmet.frameguard());
app.use(helmet.hidePoweredBy());
app.use(helmet.hsts());
app.use(helmet.ieNoOpen());
app.use(helmet.noSniff());
app.use(helmet.permittedCrossDomainPolicies());
app.use(helmet.xssFilter());

app.use(express.json());
app.use(userRouter);
app.use(articleRouter);
app.use(commentRouter);
app.use(commentVotesRouter);


app.use('/', express.static(publicDirectory));

app.listen(port, () => {
    console.log('server is listening on port:' + port)
});

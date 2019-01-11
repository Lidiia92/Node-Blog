const express = require("express");
const usersRouter = require('../routes/users/usersRouter.js');
const postsRouter = require('../routes/posts/postsRouters.js');
const configureMiddleware = require('../config/middleware.js');

const server = express();

// middleware 
configureMiddleware(server);

//users middlware
server.use('/api/users', usersRouter);

//posts middlware
server.use('/api/posts', postsRouter);


module.exports = server;
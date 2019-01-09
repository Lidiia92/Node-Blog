const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const cors = require('cors');

const server = express();

//Database
const userDb = require('../data/helpers/userDb');
const postDb = require('../data/helpers/postDb');
const tagDb = require('../data/helpers/tagDb');


//middleware - global


module.exports = server;
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
server.use(express.json()); 
server.use(helmet()); 
server.use(morgan('short')); 
server.use(cors()); 

//routers
server.get('/api/users', async (req, res, next) => {

    try{
        const userList = await userDb.get();
        res.json(userList);
    } 
    catch (err) {
        res.status(500).json({message: "Users can not be retrieved"})
    }
    
});

module.exports = server;
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
server.get('/api/users', async (req, res) => {

    try{
        const userList = await userDb.get();
        res.json(userList);
    } 
    catch (err) {
        res.status(500).json({message: "Users can not be retrieved"})
    }
    
});

function upperCase(req, res, next) {
    const user = req.body;
    const { name } = user;
  
    if (name) {
      const arr = name.split(" ");
      const upperCased = arr.map(
        item => item[0].toUpperCase() + item.slice(1).toLowerCase()
      );
      const joined = upperCased.join(" ");
      res.send(joined);
    } else {
      res.status(400).json({ message: "Please include user name" });
    }
    next();
  }

server.post('/api/users', upperCase, async (req, res) => {
    const user = req.body;
    try {
        const result = await userDb.insert(user);
        res.status(201).json({ messege: `User ${user} has been created!` });
    } catch (err) {
      res
        .status(500)
        .json({ message: "There was an error saving user to the database" });
    }
});

module.exports = server;
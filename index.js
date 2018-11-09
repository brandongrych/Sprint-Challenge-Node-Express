const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
    // db import 
const actionDb = require('./data/helpers/actionModel.js');
const projectDb = require('./data/helpers/projectModel.js');
    const server = express();
server.use(cors());
server.use(helmet());
server.use(morgan());
server.use(express.json());
    function logger (req, res, next){
    console.log(`${req.method} to ${req.url}`);
        next();
}
server.use(logger);
 /*** ----------------ACTION---------------- ***/
// GET



// PUT



// POST



// DELETE




 /*** ----------------PROJECT---------------- ***/
// GET



// PUT



// POST



// DELETE




const port = 9000;
server.listen(port, () => {
    console.log(`\n*** API Running on Port ${port}\n`)
}) 
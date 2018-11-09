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
server.get('/api/actions', (req, res) => {
    actionDb.get()
    .then(actions => {
        return res.status(200).json(actions);
    })
    .catch(err => {
        console.log(err);
        return res.status(500).json(({error: "Error retrieving actions."}))
    })
})


// PUT



// POST



// DELETE




 /*** ----------------PROJECT---------------- ***/
// GET
server.get('/api/projects', (req, res) => {
    projectDb.get()
    .then(projects => {
        return res.status(200).json(projects);
    })
    .catch(err => {
        console.log(err);
        return res.status(500).json({error: "Error retrieving projects."})
    })
})


// PUT



// POST



// DELETE




const port = 9000;
server.listen(port, () => {
    console.log(`\n*** API Running on Port ${port}\n`)
}) 
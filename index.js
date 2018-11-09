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
server.post('/api/actions', (req, res) => {
    const action = {
        "project_id": req.body.project_id,
        "description": req.body.description,
        "notes": req.body.notes
    }
        if(action.description.length > 128){
        return res.status(413).json({error: "Description has too many characters."})
    }
        if(!action.project_id || !action.description || !action.notes){
        return res.status(400).json({error: "New actions must contain an ID, a description, and notes."})
    }
        // does project exist? 
    projectDb.get(action.project_id)
    .then(reply => {
        console.log(reply);
        if(!reply){
            return res.status(404).json({error: "No project with that ID was found."})
        } else {
            actionDb.insert(action)
            .then(reply => {
                console.log(reply);
                return res.status(201).json("Action added.");
            })
            .catch(err => {
                console.log(err);
                return res.status(500).json({error: "Error adding action."})
            })
        }
    })
    .catch(err => {
        console.log(err);
        return res.status(500).json({error: `Error finding project ID ${action.project_id}`})
    })
    
    
})


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
server.post('/api/projects', (req, res) => {
    const project = {
        "name": req.body.name,
        "description": req.body.description
    }
        if(project.name.length > 128){
        return res.status(413).json({error: "Name contains too many characters."})
    }
        if(project.name.length === 0 || project.description.length === 0){
        return res.status(400).json({error: "Project must have name and description."})
    }
        projectDb.insert(project)
    .then(reply => {
        console.log(reply);
        return res.status(201).json({message: "Project added."});
    })
    .catch(err => {
        console.log(err);
        return res.status(500).json({error: "Error adding project."})
    })
})


// DELETE




const port = 9000;
server.listen(port, () => {
    console.log(`\n*** API Running on Port ${port}\n`)
}) 
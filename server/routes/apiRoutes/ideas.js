const express = require('express');
const ideasRouter = express.Router();

const db = require('../../db');
const checkMillionDollarIdea = require('../../checkMillionDollarIdea')

// GET /api/ideas to get an array of all ideas.
// POST /api/ideas to create a new idea and save it to the database.
// GET /api/ideas/:ideaId to get a single idea by id.
// PUT /api/ideas/:ideaId to update a single idea by id.
// DELETE /api/ideas/:ideaId to delete a single idea by id.
ideasRouter
    .route('/')
        .get((req, res, next) => {
            const ideaArray = db.getAllFromDatabase('ideas');
            res.send(ideaArray);
        })
        .post(checkMillionDollarIdea, (req, res, next) => {
            const ideaArray = db.getAllFromDatabase('ideas');
            const findHighestId = parseInt(ideaArray[ideaArray.length - 1].id)
            const newId = (findHighestId + 1).toString();
            req.body.id = newId;
            const newIdea = req.body;
            db.addToDatabase('ideas', newIdea);
            res.status(201).send(newIdea);
        })
        
ideasRouter.param('ideaId', (req, res, next, ideaId) => {
    if (idChecker(ideaId)) {
        req.ideaId = ideaId;
        next();
    } else {
        res.status(404).send('The id is not a number or does not exist!');
    }
});
//id checker
function idChecker (ideaId) {
    const ideaArray = db.getAllFromDatabase('ideas');
    const doesIdExist = ideaArray.find(idea => {
        return idea.id === ideaId;
    });
    if (!doesIdExist) {
        return false
    } else return true     
}

ideasRouter
    .route('/:ideaId')
        .get((req, res, next) => {
            const ideaFromId = db.getFromDatabaseById('ideas', req.ideaId);
            res.send(ideaFromId);
        })
        .put((req, res, next) => {
            const ideaUpdate = db.updateInstanceInDatabase('ideas', req.body);
            res.send(ideaUpdate);
        })
        .delete((req, res, next) => {
            const ideaToDelete = db.deleteFromDatabasebyId('ideas', req.ideaId);
            res.status(204).send(ideaToDelete);
        })


module.exports = ideasRouter;
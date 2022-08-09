const express = require('express');
const minionsRouter = express.Router();

const db = require('../../db');
//getAllFromDatabase, addToDatabase, getFromDatabaseById, updateInstanceInDatabase, deleteFromDatabasebyId



// GET /api/minions to get an array of all minions.
// POST /api/minions to create a new minion and save it to the database.
// GET /api/minions/:minionId to get a single minion by id.
// PUT /api/minions/:minionId to update a single minion by id.
// DELETE /api/minions/:minionId to delete a single minion by id.
minionsRouter.get('/', (req, res, next) => {
    const minionsArray = db.getAllFromDatabase('minions');
    res.send(minionsArray);
});

minionsRouter.post('/', (req, res, next) => {
    const minionsArray = db.getAllFromDatabase('minions');
    const lastMinion = minionsArray[minionsArray.length - 1]
    const newId = parseInt(lastMinion.id) + 1
    req.body.id = newId.toString();
    db.addToDatabase('minions', req.body);
    res.status(201).send(req.body);
});



minionsRouter.param('minionId', (req, res, next, minionId) => {
    if (idChecker(minionId)) {
        req.minionId = minionId;
        next();
    } else {
        res.status(404).send('The id is not a number or does not exist!');
    }
});

//id checker
function idChecker (minionId) {
    const minionsArray = db.getAllFromDatabase('minions');
    const doesIdExist = minionsArray.find(minion => {
        return minion.id === minionId;
    });
    if (!doesIdExist) {
        return false
    } else return true
}

// /:minionId get, put, delete
minionsRouter
    .route('/:minionId')
        .get((req, res) => {
            const oneMinion = db.getFromDatabaseById('minions', req.minionId);
            res.status(200).send(oneMinion);
        })
        .put((req, res, next) => {
            const updateMinion = db.updateInstanceInDatabase('minions', req.body);
            res.send(updateMinion);
        })
        .delete((req, res, next) => {
            db.deleteFromDatabasebyId('minions', req.minionId);
            res.status(204).send(`${req.minionId} was deleted`);
        })

module.exports = minionsRouter;
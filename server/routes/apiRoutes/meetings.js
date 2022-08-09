const express = require('express');
const meetingsRouter = express.Router();
const db = require('../../db');


// GET /api/meetings to get an array of all meetings.
// POST /api/meetings to create a new meeting and save it to the database.
// DELETE /api/meetings to delete all meetings from the database.

meetingsRouter.get('/', (req, res, next) => {
    const meetingsArray = db.getAllFromDatabase('meetings');
    res.send(meetingsArray);
})

meetingsRouter.post('/', (req, res, next) => {
    const newMeeting = db.createMeeting();
    db.addToDatabase('meetings', newMeeting);
    res.status(201).send(newMeeting);
})

meetingsRouter.delete('/', (req, res, next) => {
    const meetingToDelete = db.deleteAllFromDatabase('meetings');
    //same issue
    res.status(204).send('All meetings deleted.');
})



module.exports = meetingsRouter;
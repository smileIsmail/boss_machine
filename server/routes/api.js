const express = require('express');
const apiRouter = express.Router();

const minionsRouter = require('./apiRoutes/minions');
const ideasRouter = require('./apiRoutes/ideas');
const meetingsRouter = require('./apiRoutes/meetings');

apiRouter.use('/minions', minionsRouter);
apiRouter.use('/ideas', ideasRouter);
apiRouter.use('/meetings', meetingsRouter);




module.exports = apiRouter;

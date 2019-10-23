const apiRouter = require('express').Router();

const { send405Error } = require('../errors');

// const { sendEndpointsJSON } = require('../contollers/api-controller');

const endpoints = require('../endpoints.json');

apiRouter
  .route('/')
  .get((req, res, next) => {
    res.json({ endpoints });
  })
  .all(send405Error);

const topicsRouter = require('./topics-router');
apiRouter.use('/topics', topicsRouter);

const usersRouter = require('./users-router');
apiRouter.use('/users', usersRouter);

const articlesRouter = require('./articles-router');
apiRouter.use('/articles', articlesRouter);

const commentsRouter = require('./comments-router');
apiRouter.use('/comments', commentsRouter);

module.exports = apiRouter;

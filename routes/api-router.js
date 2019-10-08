const apiRouter = require('express').Router();

// apiRouter.get('/', () => {
//   console.log('hello!');
// });

const topicsRouter = require('./topics-router');
apiRouter.use('/topics', topicsRouter);

const usersRouter = require('./users-router');
apiRouter.use('/users', usersRouter);

const articlesRouter = require('./articles-router');
apiRouter.use('/articles', articlesRouter);

module.exports = apiRouter;

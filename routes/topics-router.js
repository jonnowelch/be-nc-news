const topicsRouter = require('express').Router();

// topicsRouter.get('/', () => {
//   console.log('hello from topics router');
// });

const { sendTopics } = require('../contollers/topics-controllers');

topicsRouter.get('/', sendTopics);

module.exports = topicsRouter;

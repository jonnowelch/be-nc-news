const commentsRouter = require('express').Router();
// console.log('hello');

commentsRouter.get('/', () => {
  console.log('hello from comments router');
});

// const { sendcomments } = require('../contollers/comments-controllers');

// commentsRouter.get('/', sendcomments);

module.exports = commentsRouter;

const commentsRouter = require('express').Router();

// commentsRouter.patch('/', () => {
//   console.log('hello from comments router');
// });

const { patchCommentVote } = require('../contollers/comments-controllers');

commentsRouter.patch('/:comment_id', patchCommentVote);

module.exports = commentsRouter;

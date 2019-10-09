const commentsRouter = require('express').Router();

// commentsRouter.patch('/', () => {
//   console.log('hello from comments router');
// });

const {
  patchCommentVote,
  deleteComment
} = require('../contollers/comments-controllers');

commentsRouter.patch('/:comment_id', patchCommentVote);

commentsRouter.delete('/:comment_id', deleteComment);

module.exports = commentsRouter;

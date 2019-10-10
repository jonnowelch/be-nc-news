const commentsRouter = require('express').Router();

// commentsRouter.patch('/', () => {
//   console.log('hello from comments router');
// });

const {
  patchCommentVote,
  deleteComment
} = require('../contollers/comments-controllers');

const { send405Error } = require('../errors');

commentsRouter
  .route('/:comment_id')
  .patch(patchCommentVote)
  .delete(deleteComment)
  .all(send405Error);

module.exports = commentsRouter;

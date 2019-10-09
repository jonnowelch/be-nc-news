const articlesRouter = require('express').Router();

// articlesRouter.get('/', () => {
//   console.log('articles router');
// });

const {
  sendArticles,
  patchVotesOnArticles
} = require('../contollers/articles-controllers');

const {
  postNewComment,
  sendCommentsByArticleId
} = require('../contollers/comments-controllers');

articlesRouter.get('/:article_id', sendArticles);

articlesRouter.patch('/:article_id', patchVotesOnArticles);

articlesRouter.post('/:article_id/comments', postNewComment);

articlesRouter.get('/:article_id/comments', sendCommentsByArticleId);

module.exports = articlesRouter;

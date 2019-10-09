const articlesRouter = require('express').Router();

// articlesRouter.get('/', () => {
//   console.log('articles router');
// });

const {
  sendAllArticles,
  sendArticlesById,
  patchVotesOnArticles
} = require('../contollers/articles-controllers');

const {
  postNewComment,
  sendCommentsByArticleId
} = require('../contollers/comments-controllers');

articlesRouter.get('/', sendAllArticles);

articlesRouter.get('/:article_id', sendArticlesById);

articlesRouter.patch('/:article_id', patchVotesOnArticles);

articlesRouter.post('/:article_id/comments', postNewComment);

articlesRouter.get('/:article_id/comments', sendCommentsByArticleId);

module.exports = articlesRouter;

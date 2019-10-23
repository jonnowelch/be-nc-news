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

const { send405Error } = require('../errors');

articlesRouter
  .route('/')
  .get(sendAllArticles)
  .all(send405Error);

articlesRouter
  .route('/:article_id')
  .get(sendArticlesById)
  .patch(patchVotesOnArticles)
  .all(send405Error);

articlesRouter
  .route('/:article_id/comments')
  .get(sendCommentsByArticleId)
  .post(postNewComment)
  .all(send405Error);

module.exports = articlesRouter;


const articlesRouter = require('express').Router();

// articlesRouter.get('/', () => {
//   console.log('articles router');
// });

const {
  sendArticles,
  patchVotesOnArticles
} = require('../contollers/articles-controllers');

const { postNewComment } = require('../contollers/comments-controllers');

articlesRouter.get('/:article_id', sendArticles);

articlesRouter.patch('/:article_id', patchVotesOnArticles);

articlesRouter.post('/:article_id/comments', postNewComment);

module.exports = articlesRouter;

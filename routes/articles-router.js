const articlesRouter = require('express').Router();

// articlesRouter.get('/', () => {
//   console.log('articles router');
// });

const { sendArticles } = require('../contollers/articles-controllers');

articlesRouter.get('/:article_id', sendArticles);

module.exports = articlesRouter;

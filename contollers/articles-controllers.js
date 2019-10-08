const { selectArticles } = require('../models/articles-models');

exports.sendArticles = (req, res, next) => {
  selectArticles(req.params.article_id).then(article => {
    res.send({ article });
  });
};

const { selectArticles, updateArticles } = require('../models/articles-models');

exports.sendArticles = (req, res, next) => {
  selectArticles(req.params.article_id).then(article => {
    res.send({ article });
  });
};

exports.patchVotesOnArticles = (req, res, next) => {
  //   console.log(req.body.inc_vote, 'vote increase');
  //   console.log(req.params, 'article id');
  updateArticles(req.body.inc_vote, req.params.article_id).then(article => {
    res.status(202).send(article);
  });
};

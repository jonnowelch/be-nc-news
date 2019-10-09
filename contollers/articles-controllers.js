const {
  selectAllArticles,
  selectArticlesById,
  updateArticles
} = require('../models/articles-models');

exports.sendAllArticles = (req, res, next) => {
  selectAllArticles(req.query).then(articles => {
    // console.log(articles, '****');
    res.status(200).send({ articles });
  });
};

exports.sendArticlesById = (req, res, next) => {
  selectArticlesById(req.params.article_id).then(article => {
    res.status(200).send({ article });
  });
};

exports.patchVotesOnArticles = (req, res, next) => {
  //   console.log(req.body.inc_vote, 'vote increase');
  console.log(req.params, 'article id');
  updateArticles(req.body.inc_vote, req.params.article_id).then(article => {
    res.status(202).send(article);
  });
};

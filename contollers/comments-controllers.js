const {
  addComment,
  selectCommentsByArticleId
} = require('../models/comments-models');

exports.postNewComment = (req, res, next) => {
  //   console.log(req.body.body, 'body in controller');
  //   console.log(req.body.username, 'username in controller');
  //   console.log(req.params.article_id, 'params article id in controller');
  addComment(req.body.username, req.body.body, req.params.article_id)
    .then(comment => {
      // console.log(comment[0], '////////');
      res.status(201).send([comment[0]]);
    })
    .catch(next);
};

exports.sendCommentsByArticleId = (req, res, next) => {
  const {
    params: { article_id }
  } = req;
  // console.log(article_id);
  selectCommentsByArticleId(article_id).then(comments => {
    // console.log(comments, 'in the comments controller');
    // console.log({ comments });
    res.status(200).send({ comments });
  });
};

const {
  addComment,
  selectCommentsByArticleId,
  updateCommentVote,
  removeComment
} = require('../models/comments-models');

exports.postNewComment = (req, res, next) => {
  addComment(req.body.username, req.body.body, req.params.article_id)
    .then(comment => {
      res.status(201).send([comment[0]]);
    })
    .catch(next);
};

exports.sendCommentsByArticleId = (req, res, next) => {
  // console.log(req.query.order, '/////');
  const {
    params: { article_id }
  } = req;
  selectCommentsByArticleId(
    article_id,
    req.query.sort_by,
    req.query.order
  ).then(comments => {
    res.status(200).send({ comments });
  });
};

exports.patchCommentVote = (req, res, next) => {
  updateCommentVote(req.body.inc_votes, req.params.comment_id).then(comment => {
    res.status(202).send(comment);
  });
};

exports.deleteComment = (req, res, next) => {
  // console.log(req.params);
  removeComment(req.params.comment_id).then(response => {
    res.sendStatus(204);
  });
};

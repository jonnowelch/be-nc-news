const { addComment } = require('../models/comments-models');

exports.postNewComment = (req, res, next) => {
  //   console.log(req.body, '***');
  addComment(req.body, article_id).then(comment => {
    res.status(201).send(comment);
  });
};

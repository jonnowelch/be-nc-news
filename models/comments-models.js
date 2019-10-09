const connection = require('../db/connections');

exports.addComment = (username, body, article_id) => {
  // console.log(username, body, article_id);
  return connection
    .insert({ author: username, body, article_id })
    .into('comments_table')
    .returning('*')
    .then(comment => {
      return comment;
    });
};

exports.selectCommentsByArticleId = article_id => {
  return connection
    .select('*')
    .from('comments_table')
    .where({ article_id })
    .then(comments => {
      // console.log(comments, 'in the comments model');
      return comments;
    });
};

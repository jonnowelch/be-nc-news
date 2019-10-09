const connection = require('../db/connections');

exports.addComment = (username, body, article_id) => {
  return connection
    .insert({ author: username, body, article_id })
    .into('comments_table')
    .returning('*')
    .then(comment => {
      return comment;
    });
};

exports.selectCommentsByArticleId = (article_id, sort_by, order) => {
  const sortBy = sort_by || 'created_at';
  const sortOrder = order || 'desc';
  // console.log(order, '***');
  return connection
    .select('*')
    .from('comments_table')
    .where({ article_id })
    .orderBy(sortBy, sortOrder)
    .then(comments => {
      return comments;
    });
};

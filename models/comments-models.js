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

exports.updateCommentVote = (vote_update_amount, article_id) => {
  return connection
    .into('comments_table')
    .increment('votes', vote_update_amount || 0)
    .where('article_id', article_id)
    .returning('*')
    .then(response => {
      return response[0];
    });
};

exports.removeComment = comment_id => {
  // console.log(comment_id);
  return connection
    .into('comments_table')
    .where('comment_id', comment_id)
    .delete()
    .returning('*');
};

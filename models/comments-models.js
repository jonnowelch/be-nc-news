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
  // console.log(order);
  if (order) {
    if (order !== 'asc' && order !== 'desc') {
      return Promise.reject({
        status: 400,
        msg: 'Please sort by ascending or descending'
      });
    }
  }
  const sortOrder = order || 'desc';
  return connection
    .select('*')
    .from('comments_table')
    .where({ article_id })
    .orderBy(sortBy, sortOrder)
    .then(comments => {
      if (!comments.length) {
        return Promise.reject({
          status: 404,
          msg: 'Username does not exist'
        });
      }
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
  return connection
    .into('comments_table')
    .where('comment_id', comment_id)
    .delete()
    .then(deletedComment => {
      // console.log(deletedComment);
      if (deletedComment === 0) {
        // console.log(deletedComment.length);
        return Promise.reject({
          status: 404,
          msg: 'Comment does not exist'
        });
      } else {
        return deletedComment;
      }
    });
};

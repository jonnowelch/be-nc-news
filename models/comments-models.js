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

const connection = require('../db/connections');

exports.selectArticles = article_id => {
  return connection
    .select('articles_table.*')
    .from('articles_table')
    .where('articles_table.article_id', article_id)
    .leftJoin(
      'comments_table',
      'articles_table.article_id',
      'comments_table.article_id'
    )
    .count({ comment_count: 'comment_id' })
    .groupBy('articles_table.article_id')
    .then(article => {
      return article;
    });
};

exports.updateArticles = (vote_update_amount, article_id) => {
  //   console.log(vote_update_amount.inc_vote, article_id.article_id);
  //   console.log(article_id, '****');
  return connection
    .into('articles_table')
    .increment('votes', vote_update_amount || 0)
    .where('article_id', article_id)
    .returning('*')
    .then(response => {
      //   console.log(response[0], 'inarticlesmodel');
      return response[0];
    });
};

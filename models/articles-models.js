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

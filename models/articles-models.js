const connection = require('../db/connections');

exports.selectAllArticles = query => {
  const sort = query.sort_by || 'created_at';
  console.log(sort);
  const order = query.order || 'desc';
  return connection
    .select('articles_table.*')
    .from('articles_table')
    .leftJoin(
      'comments_table',
      'articles_table.article_id',
      'comments_table.article_id'
    )
    .count({ comment_count: 'comment_id' })
    .groupBy('articles_table.article_id')
    .orderBy(sort, order)
    .modify(queryBuilder => {
      console.log(query.author);
      if (query.author)
        queryBuilder.where('articles_table.author', query.author);
      if (query.topic) queryBuilder.where('topic', query.topic);
    })
    .then(articles => {
      if (!articles.length)
        return Promise.reject({
          status: 404,
          msg: 'Author does not exist'
        });
      return articles;
    });
};

exports.selectArticlesById = article_id => {
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
  return connection
    .into('articles_table')
    .increment('votes', vote_update_amount || 0)
    .where('article_id', article_id)
    .returning('*')
    .then(response => {
      return response[0];
    });
};

const connection = require('../db/connections');

exports.selectAllArticles = query => {
  // console.log(query);
  const sort = query.sort_by || 'created_at';
  if (query.order) {
    if (query.order !== 'asc' && query.order !== 'desc') {
      return Promise.reject({
        status: 400,
        msg: 'Please sort by ascending or descending'
      });
    }
  }
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
      if (query.author)
        queryBuilder.where('articles_table.author', query.author);
      if (query.topic) queryBuilder.where('topic', query.topic);
    })
    .then(articles => {
      console.log(articles);
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
      // console.log(article);
      if (!article.length)
        return Promise.reject({
          status: 404,
          msg: 'Article does not exist'
        });
      return article;
    });
};

exports.updateArticles = (vote_update_amount, article_id) => {
  if (vote_update_amount) {
    if (isNaN(parseInt(vote_update_amount))) {
      return Promise.reject({
        status: 400,
        msg: 'must increase votes by number'
      });
    }
  }
  return connection
    .into('articles_table')
    .increment('votes', vote_update_amount || 0)
    .where('article_id', article_id)
    .returning('*')
    .then(response => {
      return response[0];
    });
};

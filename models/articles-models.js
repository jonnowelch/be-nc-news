const connection = require('../db/connections');

exports.selectAllArticles = query => {
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
      // console.log(articles);
      if (!articles.length) {
        if (query.author) {
          return checkUserExists(query.author);
        }
        if (query.topic) {
          return checkTopicExists(query.topic);
        }
      }
      return articles;
    });
};

function checkUserExists(username) {
  return connection
    .select('*')
    .from('users_table')
    .where('username', username)
    .then(([user]) => {
      if (user) return [];
      return Promise.reject({
        status: 404,
        msg: 'Author does not exist'
      });
    });
}

function checkTopicExists(topic) {
  return connection
    .select('*')
    .from('topics_table')
    .where('slug', topic)
    .then(([topic]) => {
      if (topic) return [];
      return Promise.reject({
        status: 404,
        msg: 'Topic does not exist'
      });
    });
}
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

exports.updateArticles = (inc_votes, article_id) => {
  if (inc_votes) {
    if (isNaN(parseInt(inc_votes))) {
      return Promise.reject({
        status: 400,
        msg: 'must increase votes by number'
      });
    }
  }
  return connection
    .into('articles_table')
    .increment('votes', inc_votes || 0)
    .where('article_id', article_id)
    .returning('*')
    .then(response => {
      return response[0];
    });
};

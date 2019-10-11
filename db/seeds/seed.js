const {
  topicData,
  articleData,
  commentData,
  userData
} = require('../data/index.js');

const { formatDates, formatComments, makeRefObj } = require('../utils/utils');

exports.seed = function(knex) {
  return knex.migrate
    .rollback()
    .then(() => knex.migrate.latest())
    .then(() => {
      const topicsInsertions = knex('topics_table').insert(topicData);
      const usersInsertions = knex('users_table').insert(userData);
      return Promise.all([topicsInsertions, usersInsertions]);
    })
    .then(() => {
      const formattedArticles = formatDates(articleData);
      return knex('articles_table')
        .insert(formattedArticles)
        .returning('*');
    })
    .then(articleRows => {
      const articleRef = makeRefObj(articleRows, 'article_id', 'title');
      const formattedComments = formatComments(commentData, articleRef);
      return knex('comments_table').insert(formattedComments);
    });
};

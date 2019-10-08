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
      // console.log(usersInsertions);
      return Promise.all([topicsInsertions, usersInsertions]);
    })
    .then(() => {
      const formattedArticles = formatDates(articleData);
      return knex('articles_table')
        .insert(formattedArticles)
        .returning('*');
    })
    .then(articleRows => {
      // console.log(articleRows);
      const articleRef = makeRefObj(articleRows, 'title', 'article_id');
      const formattedComments = formatComments(commentData, articleRef);
      return knex('comments_table').insert(formattedComments);
    });
};

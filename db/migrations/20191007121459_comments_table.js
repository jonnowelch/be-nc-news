exports.up = function(knex) {
  console.log('in the comments up function');
  return knex.schema.createTable('comments_table', commentsTable => {
    commentsTable.increments('comment_id').primary();
    commentsTable.string('author').references('users_table.username');
    commentsTable.integer('article_id').references('articles_table.article_id');
    commentsTable.integer('votes').defaultTo(0);
    commentsTable.timestamps();
    commentsTable.string('body');
  });
};

exports.down = function(knex) {
  console.log('in the comments down fucntion');
  return knex.schema.dropTable('comments_table');
};

exports.up = function(knex) {
  // console.log('in the comments up function');
  return knex.schema.createTable('comments_table', commentsTable => {
    commentsTable.increments('comment_id').primary();
    commentsTable
      .string('author')
      .references('users_table.username')
      .notNullable();
    commentsTable
      .integer('article_id')
      .references('articles_table.article_id')
      .notNullable();
    commentsTable.integer('votes').defaultTo(0);
    commentsTable.timestamp('created_at');
    commentsTable.string('body');
  });
};

exports.down = function(knex) {
  // console.log('in the comments down function');
  return knex.schema.dropTable('comments_table');
};

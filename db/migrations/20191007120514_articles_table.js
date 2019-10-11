exports.up = function(knex) {
  return knex.schema.createTable('articles_table', articlesTable => {
    articlesTable.increments('article_id').primary();
    articlesTable.string('title');
    articlesTable.text('body');
    articlesTable.integer('votes').defaultTo(0);
    articlesTable.string('topic').references('topics_table.slug');
    articlesTable.string('author').references('users_table.username');
    articlesTable.timestamp('created_at');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('articles_table');
};

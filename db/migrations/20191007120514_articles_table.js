exports.up = function(knex) {
  console.log('in the articles up function');
  return knex.schema.createTable('articles_table', articlesTable => {
    articlesTable.increments('article_id').primary();
    articlesTable.string('title');
    articlesTable.text('body');
    articlesTable.integer('votes').defaultTo(0);
    articlesTable.string('topic').references('topics_table.slug');
    articlesTable.string('author').references('users_table.username');
    articlesTable.timestamps();
  });
};

exports.down = function(knex) {
  console.log('in the articles down fucntion');
  return knex.schema.dropTable('articles_table');
};

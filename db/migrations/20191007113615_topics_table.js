exports.up = function(knex) {
  return knex.schema.createTable('topics_table', topicsTable => {
    topicsTable
      .string('slug')
      .unique()
      .primary();
    topicsTable.string('description').notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('topics_table');
};

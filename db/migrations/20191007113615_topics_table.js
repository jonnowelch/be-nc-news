exports.up = function(knex) {
  console.log('in the topics up function');
  return knex.schema.createTable('topics_table', topicsTable => {
    topicsTable
      .string('slug')
      .unique()
      .primary();
    topicsTable.string('description').notNullable();
  });
};

exports.down = function(knex) {
  console.log('in the topics down fucntion');
  return knex.schema.dropTable('topics_table');
};

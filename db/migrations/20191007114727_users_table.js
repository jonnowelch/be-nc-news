exports.up = function(knex) {
  return knex.schema.createTable('users_table', usersTable => {
    usersTable
      .string('username')
      .unique()
      .primary();
    usersTable.string('avatar_url');
    usersTable.string('name');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('users_table');
};

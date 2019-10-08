exports.up = function(knex) {
  // console.log('in the users up fucntion');
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
  // console.log('in the users down fucntion');
  return knex.schema.dropTable('users_table');
};

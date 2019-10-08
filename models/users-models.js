const connection = require('../db/connections');

exports.selectUsers = username => {
  return connection
    .select('*')
    .from('users_table')
    .where(username)
    .then(user => {
      return user;
    });
};

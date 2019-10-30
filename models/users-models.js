const connection = require('../db/connections');

exports.selectAllUsers = () => {
  return connection
    .select('*')
    .from('users_table')
    .then(data => {
      return data;
    });
};

exports.selectUsers = username => {
  return connection
    .first('*')
    .from('users_table')
    .where(username)
    .then(user => {
      if (!user)
        return Promise.reject({ status: 404, msg: 'Username does not exist' });
      return user;
    });
};

const connection = require('../db/connections');

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

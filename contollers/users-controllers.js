const { selectUsers } = require('../models/users-models');

exports.sendUsers = (req, res, next) => {
  selectUsers(req.params).then(user => {
    res.send({ user });
  });
};

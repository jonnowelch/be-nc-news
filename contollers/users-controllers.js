const { selectAllUsers, selectUsers } = require('../models/users-models');

exports.sendAllUsers = (req, res, next) => {
  selectAllUsers().then(users => {
    res.send({ users });
  });
};

exports.sendUsers = (req, res, next) => {
  selectUsers(req.params)
    .then(user => {
      res.send({ user });
    })
    .catch(next);
};

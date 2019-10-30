const usersRouter = require('express').Router();

const { send405Error } = require('../errors');

const { sendAllUsers, sendUsers } = require('../contollers/users-controllers');

usersRouter
  .route('/')
  .get(sendAllUsers)
  .all(send405Error);

usersRouter
  .route('/:username')
  .get(sendUsers)
  .all(send405Error);

module.exports = usersRouter;

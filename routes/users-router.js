const usersRouter = require('express').Router();

// usersRouter.get('/', () => {
//   console.log('users router');
// });

const { send405Error } = require('../errors');

const { sendUsers } = require('../contollers/users-controllers');

usersRouter
  .route('/:username')
  .get(sendUsers)
  .all(send405Error);

module.exports = usersRouter;

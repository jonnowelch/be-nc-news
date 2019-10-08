const usersRouter = require('express').Router();

// usersRouter.get('/', () => {
//   console.log('users router');
// });

const { sendUsers } = require('../contollers/users-controllers');

usersRouter.get('/:username', sendUsers);

module.exports = usersRouter;

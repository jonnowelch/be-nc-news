const topicsRouter = require('express').Router();

const { send405Error } = require('../errors');

const { sendTopics } = require('../contollers/topics-controllers');

topicsRouter
  .route('/')
  .get(sendTopics)
  .all(send405Error);

module.exports = topicsRouter;

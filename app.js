const express = require('express');
const app = express();
const apiRouter = require('./routes/api-router');
const cors = require('cors');
const {
  handleCustomErrors,
  handlePsqlErrors,
  handleServerError
} = require('./errors/errors');

app.use(cors());

app.use(express.json());

app.use('/api', apiRouter);

app.use('/*', (req, res, next) => {
  res.status(404).send({ msg: 'route not found' });
});

app.use(handlePsqlErrors);
app.use(handleCustomErrors);
app.use(handleServerError);

module.exports = app;

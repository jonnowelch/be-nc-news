const express = require('express');
const app = express();
const apiRouter = require('./routes/api-router');
// const { handleCustomErrors, handlePsqlErrors } = require('./errors/errors');

app.use(express.json());

app.use('/api', apiRouter);

// app.use('/*', (req, res, next) => {
//   res.status(404).send({ msg: 'route not found' });
// });

// app.use(handlePsqlErrors);
// app.use(handleCustomErrors);

module.exports = app;

const express = require('express');
const app = express();
const apiRouter = require('./routes/api-router');
const {
  handleCustomErrors,
  handlePsqlErrors,
  handleServerError
} = require('./errors/errors');

const cors = require('cors');
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

// https://dashboard.heroku.com/apps/nc-news-jonno/resources?justInstalledAddonServiceId=6c67493d-8fc2-4cd4-9161-4f1ec11cbe69

// postgres://mbdrmvndzqbnqq:0f092dc04083ed1ee41b6cf77b3e2bec703a8f716ad56233df0966c286a99a43@ec2-46-137-187-23.eu-west-1.compute.amazonaws.com:5432/d6923eku2m0ud

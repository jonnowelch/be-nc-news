exports.handlePsqlErrors = (err, req, res, next) => {
  // console.log(err, 'hihih');
  const psqlCodes = { '42703': 'Search value does not exist in table' };
  if (psqlCodes[err.code]) {
    res.status(400).send({ msg: psqlCodes[err.code] });
  } else next(err);
};

exports.handleCustomErrors = (err, req, res, next) => {
  // console.log(err, '****');
  if (err.status) {
    res.status(err.status).send({ msg: err.msg });
  } else {
    next(err);
  }
};

exports.handleServerError = (err, req, res, next) => {
  res.status(500).send({ msg: 'Internal Server Error' });
};

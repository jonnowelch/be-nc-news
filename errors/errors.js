exports.handlePsqlErrors = (err, req, res, next) => {
  // console.log(err, 'hihih');
  const psqlCodes400 = {
    '42703': 'Search value does not exist in table',
    '22P02': 'Please provide a valid article id number'
  };
  const psqlCodes404 = { '23503': 'article doesnt exist' };
  if (psqlCodes400[err.code]) {
    res.status(400).send({ msg: psqlCodes400[err.code] });
  }
  if (psqlCodes404[err.code]) {
    res.status(404).send({ msg: psqlCodes404[err.code] });
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

exports.handlePsqlErrors = (err, req, res, next) => {
  // console.log(err, 'hihih');
  if (err.code) {
    res.status(400).send({ msg: err.message });
  } else next(err);
};

exports.handleCustomErrors = (err, req, res, next) => {
  // console.log(err);
  if (err.status) {
    res.status(err.status).send({ msg: err.msg });
  } else {
    res.status(500).send({ msg: 'Internal Server Error' });
  }
};

exports.handleServerError = (err, req, res, next) => {
  res.status(500).send({ msg: 'Internal Server Error' });
};

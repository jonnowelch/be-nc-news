const { endpoints } = require('../');

exports.sendEndpointsJSON = (req, res, next) => {
  console.log(endpoints);
  res.json(200).send({ endpoints });
};

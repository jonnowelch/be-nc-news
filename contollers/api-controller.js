const { selectAllEndpoints } = require('../models/api-model');

exports.sendEndpointsJSON = (req, res, next) => {
  selectAllEndpoints()
    .then(endpoints => {
      res.status(200).send({ endpoints });
    })
    .catch(next);
};

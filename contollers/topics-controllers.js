const { selectTopics } = require('../models/topics-models');

exports.sendTopics = (req, res, next) => {
  //   console.log('in the topics controller');
  selectTopics().then(topics => {
    res.send({ topics });
  });
};

const connection = require('../db/connections');

exports.selectTopics = () => {
  //   console.log('in the topics model');
  return connection
    .select('*')
    .from('topics_table')
    .then(data => {
      //   console.log(data, '<----here');
      return data;
    });
};

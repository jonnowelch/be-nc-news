exports.formatDates = list => {
  const formattedArr = list.map(({ created_at, ...restOfKeys }) => ({
    created_at: new Date(created_at),
    ...restOfKeys
  }));
  //   console.log(formattedObj, 'formobj here');
  return formattedArr;
};
exports.makeRefObj = list => {};

exports.formatComments = (comments, articleRef) => {};

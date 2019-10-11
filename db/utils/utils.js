exports.formatDates = list => {
  const formattedArr = list.map(({ created_at, ...restOfKeys }) => ({
    created_at: new Date(created_at),
    ...restOfKeys
  }));
  return formattedArr;
};
exports.makeRefObj = (list, key, value) => {
  if (!list.length) return {};

  const refObj = {};

  list.forEach(item => {
    refObj[item[value]] = item[key];
  });

  return refObj;
};

exports.formatComments = (comments, articleRef) => {
  return comments.map(element => {
    const { ...newElement } = element;
    newElement.author = newElement.created_by;
    newElement.article_id = newElement.belongs_to;
    newElement.article_id = articleRef[newElement.article_id];
    newElement.created_at = new Date(newElement.created_at);
    delete newElement.belongs_to;
    delete newElement.created_by;
    return newElement;
  });
};

const calculateOffsetAndLimit = function (page, pageSize) {
  if (page <= 0) {
    page = 1;
  }

  const limit = +pageSize;
  const offset = (page - 1) * pageSize;

  return { offset: offset, limit: limit };
};

module.exports = calculateOffsetAndLimit;

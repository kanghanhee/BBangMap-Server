module.exports = {
  success: (status, message, data, totalCount) => ({
    status,
    success: true,
    message,
    data,
    totalCount,
  }),

  fail: (status, message) => ({
    status,
    success: false,
    message,
  }),
};

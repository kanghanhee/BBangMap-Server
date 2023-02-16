const reviewDto = require('./reviewDto');

const reviewListDto = (reviewList, userId) => {
  return reviewList.map(review => {
    return reviewDto.detailDto(review, userId);
  });
};

module.exports = reviewListDto;

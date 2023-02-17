const reviewDto = require('./reviewDto');

const reviewListDto = (reviewList) => {
  return reviewList.map(review => {
    return reviewDto.detailDto(review);
  });
};

module.exports = reviewListDto;

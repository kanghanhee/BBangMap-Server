const reviewDto = require('./reviewDto');

const reviewListDto = reviewList => {
  return reviewList.map(review => {
    return reviewDto(review);
  });
};

module.exports = reviewListDto;

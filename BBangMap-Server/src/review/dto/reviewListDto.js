const reviewDto = require('./reviewDto');
const reviewAllDto = require('./reviewAllDto');

const reviewListDto = (reviewList, userId) => {
  return reviewList.map(review => {
    return reviewDto.detailDto(review);
  });
};

// 후기 전체보기 raw query로 불러온 데이터들
const reviewAllListDto = reviewList => {
  return reviewList.map(review => {
    return reviewAllDto.detailDto(review);
  });
};

module.exports = { reviewListDto, reviewAllListDto };

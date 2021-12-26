const savedReviewOfBakeryDto = require('./savedReviewOfBakeryDto');

const savedReviewOfBakeryListDto = (savedReviewOfBakeryList, totalCount) => {
  return {
    reviewList: savedReviewOfBakeryList.map(savedReviewOfBakeryList => savedReviewOfBakeryDto(savedReviewOfBakeryList)),
    totalCount: totalCount,
  };
};

module.exports = savedReviewOfBakeryListDto;

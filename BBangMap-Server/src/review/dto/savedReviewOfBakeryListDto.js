const savedReviewOfBakeryDto = require("./savedReviewOfBakeryDto");

const savedReviewOfBakeryListDto = (savedReviewOfBakeryList) => {
  return savedReviewOfBakeryList.map((savedReviewOfBakeryList) =>
    savedReviewOfBakeryDto(savedReviewOfBakeryList)
  );
};

module.exports = savedReviewOfBakeryListDto;

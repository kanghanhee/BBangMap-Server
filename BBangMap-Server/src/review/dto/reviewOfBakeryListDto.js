const reviewOfBakeryDto = require('./reviewOfBakeryDto');

const reviewListOfBakeryDto = reviewOfBakeryList => {
  return reviewOfBakeryList.map(reviewOfBakery => {
    return reviewOfBakeryDto(reviewOfBakery);
  });
};

module.exports = reviewListOfBakeryDto;

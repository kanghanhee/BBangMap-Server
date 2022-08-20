const requestedBakeryDto = require('./requestBakeryDto');

const requestedBakeryListDto = bakeryList => {
  return bakeryList.map(bakery => requestedBakeryDto(bakery));
};
module.exports = requestedBakeryListDto;

const requestBakerySlackDto = require('./requestBakerySlackDto');

const requestedBakeryListDto = bakeryList => {
  return {
    blocks: bakeryList.map(bakery => requestBakerySlackDto(bakery)),
  };
};
module.exports = requestedBakeryListDto;

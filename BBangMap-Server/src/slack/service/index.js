const requestedBakeryUtils = require('../../requestedBakery/utils');
const requestedBakeryListDto = require('../dto/requestBakeryListDto');

module.exports = {
  getRequestedBakeryList: async () => {
    const requestedBakery = await requestedBakeryUtils.getRequestedBakeryList();

    return requestedBakeryListDto(requestedBakery);
  },
};

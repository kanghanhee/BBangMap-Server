const requestedBakeryUtils = require('../../requestedBakery/utils');
const requestedBakeryListSlackDto = require('../dto/requestBakeryListSlackDto');

module.exports = {
  getRequestedBakeryList: async () => {
    const requestedBakery = await requestedBakeryUtils.getRequestedBakeryList();

    return requestedBakeryListSlackDto(requestedBakery);
  },
};

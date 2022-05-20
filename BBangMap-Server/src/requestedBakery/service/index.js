const modelUtil = require('../../../models/modelUtil');
const userUtils = require('../../user/utils');
const bakeryUtils = require('../utils');
const reviewUtils = require('../../review/utils');
const { Bakery } = require('../../../models');
const db = require('../../../models');

const requestBakerySearchDto = require('../dto/requestBakerySearchDto');
module.exports = {
  getSearchRequestBakeryList: async keyword => {
    if (keyword) {
      const result = [];
      const kakaoBakeryList = await bakeryUtils.getKakaoBakeryList(keyword);
      // eslint-disable-next-line no-restricted-syntax
      for (const bakery of kakaoBakeryList) {
        const isExistedBakery = await bakeryUtils.findBakeryByLocation(bakery.place_name, bakery.y, bakery.x);
        result.push(requestBakerySearchDto(bakery.place_name, bakery.road_address_name, bakery.id, isExistedBakery));
      }
      return result;
    }
    return null;
  },
};

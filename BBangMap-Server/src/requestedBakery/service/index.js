const modelUtil = require('../../../models/modelUtil');
const requestedBakeryUtils = require('../utils');
const responseMessage = require('../../../modules/responseMessage');
const statusCode = require('../../../modules/statusCode');
const requestBakerySearchDto = require('../dto/requestBakerySearchDto');
const requestBakeryDto = require('../dto/requestBakeryDto');
const responseBakeryDto = require('../dto/responseBakeryDto');

module.exports = {
  getSearchRequestedBakeryList: async keyword => {
    if (keyword) {
      const result = [];
      const kakaoBakeryList = await requestedBakeryUtils.getKakaoBakeryList(keyword);
      // eslint-disable-next-line no-restricted-syntax
      for (const bakery of kakaoBakeryList) {
        const isExistedBakery = await requestedBakeryUtils.findBakeryByLocation(bakery.place_name, bakery.y, bakery.x);
        result.push(requestBakerySearchDto(bakery.place_name, bakery.road_address_name, bakery.id, isExistedBakery));
      }
      return result;
    }
    return null;
  },
  saveRequestedBakery: async (user, id, name) => {
    if (id && name) {
      const kakaoBakeryList = await requestedBakeryUtils.getKakaoBakeryList(name);
      const targetBakery = kakaoBakeryList.map(bakery => {
        if (id === bakery.id) return bakery;
      });

      if (targetBakery[0] == null)
        throw {
          statusCode: statusCode.BAD_REQUEST,
          responseMessage: responseMessage.NO_BAKERY,
        };

      await requestedBakeryUtils.save(
        user.id,
        targetBakery[0].id,
        targetBakery[0].place_name,
        targetBakery[0].road_address_name,
        targetBakery[0].x,
        targetBakery[0].y,
      );
    }
  },
  getRequestedBakeryList: async user => {
    const result = [];
    const requestedBakeryList = await requestedBakeryUtils.findRequestedBakeryList(user.id);
    requestedBakeryList.forEach(bakery => {
      result.push(requestBakeryDto(bakery.id, bakery.bakeryName, bakery.address, bakery.status));
    });
    return result;
  },
  changeRequestBakeryStatus: async (user, bakeryId, isAccept) => {
    if (user.role !== 1)
      // eslint-disable-next-line no-throw-literal
      throw {
        statusCode: statusCode.UNAUTHORIZED,
        responseMessage: responseMessage.UNAUTHORIZED,
      };
    await requestedBakeryUtils.acceptBakeryRequest(bakeryId, isAccept);
  },
};

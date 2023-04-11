const modelUtil = require('../../../models/modelUtil');
const requestedBakeryUtils = require('../utils');
const responseMessage = require('../../../modules/responseMessage');
const statusCode = require('../../../modules/statusCode');
const requestBakerySearchDto = require('../dto/requestBakerySearchDto');
const requestBakeryDto = require('../dto/requestBakeryDto');
const requestBakeryDetailDto = require('../dto/requestBakeryDetailDto');

module.exports = {
  getSearchRequestedBakeryList: async keyword => {
    if (keyword) {
      const result = [];
      const kakaoBakeryList = await requestedBakeryUtils.getKakaoBakeryList(keyword);
      // eslint-disable-next-line no-restricted-syntax
      for (const bakery of kakaoBakeryList) {
        const isExistedBakery = await requestedBakeryUtils.findBakeryByLocation(bakery.place_name, bakery.y, bakery.x);
        const isRequestedBakery = await requestedBakeryUtils.findRequestedBakeryByLocation(
          bakery.place_name,
          bakery.y,
          bakery.x,
        );
        const status = isExistedBakery ? 'REGISTERED' : isRequestedBakery ? 'REQUESTED' : 'NONE';
        result.push(requestBakerySearchDto(bakery.place_name, bakery.road_address_name, bakery.id, status));
      }
      return result;
    }
    return null;
  },
  saveRequestedBakery: async (user, id, name, reason) => {
    if (id && name) {
      const kakaoBakeryList = await requestedBakeryUtils.getKakaoBakeryList(name);
      const targetBakery = kakaoBakeryList.filter(bakery => id === bakery.id);

      if (targetBakery[0] == null)
        throw {
          statusCode: statusCode.BAD_REQUEST,
          responseMessage: responseMessage.NO_BAKERY,
        };

      await requestedBakeryUtils.save(
        user.id,
        reason,
        targetBakery[0].id,
        targetBakery[0].place_name,
        targetBakery[0].road_address_name,
        targetBakery[0].x,
        targetBakery[0].y,
      );
    }
  },
  getRequestedBakeryList: async () => {
    const result = [];
    const requestedBakeryList = await requestedBakeryUtils.getRequestedBakeryList();
    requestedBakeryList.forEach(bakery => {
      result.push(
        requestBakeryDetailDto(
          bakery.id,
          bakery.placeId,
          bakery.UserId,
          bakery.bakeryName,
          bakery.address,
          bakery.latitude,
          bakery.longitude,
          bakery.status,
          bakery.reason,
        ),
      );
    });
    return result;
  },
  getRequestedBakeryListByUserId: async user => {
    const result = [];
    const requestedBakeryList = await requestedBakeryUtils.findRequestedBakeryListByUserId(user.id);
    requestedBakeryList.forEach(bakery => {
      result.push(
        requestBakeryDetailDto(
          bakery.id,
          bakery.placeId,
          bakery.UserId,
          bakery.bakeryName,
          bakery.address,
          bakery.latitude,
          bakery.longitude,
          bakery.status,
          bakery.reason,
        ),
      );
    });
    return result;
  },
  changeRequestBakeryStatus: async (user, bakeryId, isAccept) => {
    await requestedBakeryUtils.acceptBakeryRequest(bakeryId, isAccept);
  },
  requestBakeryVerifiedToRequest: async (placeId) => {
    const status = "VERIFYED_BY_WORKER";
    const findRequestBakery = await requestedBakeryUtils.findRequestedBakeryByPlaceId(placeId, status);

    if(findRequestBakery !== null) {
      const changeStatus = "REGISTERED";
      await requestedBakeryUtils.updateRequestBakeryStatus(placeId, changeStatus);
      return true;
    }

    return false;
  }
};

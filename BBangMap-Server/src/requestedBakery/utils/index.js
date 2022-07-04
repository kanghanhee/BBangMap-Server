const { Bakery, User, RequestedBakery } = require('../../../models');
const { Op } = require('sequelize');
const axios = require('axios').default;
const { response } = require('express');
const { sequelize } = require('../../../models/index');
const responseMessage = require('../../../modules/responseMessage');
const statusCode = require('../../../modules/statusCode');
const { requestBakerySearch } = require('../controller');
const {KAKAO_AUTH,KAKAO_URL}= require('../../../config/kakao');

module.exports = {
  getKakaoBakeryList: async keyword => {
    try {
      const response = await axios.get(`${KAKAO_URL}/local/search/keyword`, {
        headers: {
          Authorization: KAKAO_AUTH,
        },
        params: {
          query: keyword,
          category_group_code: 'FD6,CE7',
          page: 1,
          size: 15,
        },
      });
      return response.data.documents;
    } catch (error) {
      throw error;
    }
  },
  findBakeryByLocation: async (bakeryName, latitude, longitude) => {
    // eslint-disable-next-line no-return-await
    const findBakery = await sequelize.query(
      'SELECT EXISTS (SELECT id FROM Bakery WHERE bakeryName = (:bakeryName) AND ROUND(latitude,3) = ROUND((:latitude),3) AND ROUND(longitude, 3) = ROUND((:longitude),3) LIMIT 1) AS SUCCESS;',
      {
        replacements: { latitude: `${latitude}`, longitude: `${longitude}`, bakeryName: `${bakeryName}` },
        type: sequelize.QueryTypes.SELECT,
        raw: true,
      },
    );
    if (findBakery[0].SUCCESS === 1) return true;
    return false;
  },
  findRequestedBakeryByLocation: async (bakeryName, latitude, longitude) => {
    // eslint-disable-next-line no-return-await
    const findBakery = await sequelize.query(
      'SELECT EXISTS (SELECT id FROM RequestedBakery WHERE bakeryName = (:bakeryName) AND ROUND(latitude,3) = ROUND((:latitude),3) AND ROUND(longitude, 3) = ROUND((:longitude),3) LIMIT 1) AS SUCCESS;',
      {
        replacements: { latitude: `${latitude}`, longitude: `${longitude}`, bakeryName: `${bakeryName}` },
        type: sequelize.QueryTypes.SELECT,
        raw: true,
      },
    );
    if (findBakery[0].SUCCESS === 1) return true;
    return false;
  },
  save: async (userId, reason, placeId, placeName, address, longitude, latitude) => {
    try {
      await RequestedBakery.create({
        UserId: userId,
        reason,
        placeId,
        bakeryName: placeName,
        address,
        longitude,
        latitude,
        status: 'REQUESTED',
      });
    } catch (error) {
      throw {
        statusCode: statusCode.BAD_REQUEST,
        responseMessage: responseMessage.DUPLICATE_BAKERY,
      };
    }
  },
  findRequestedBakeryList: async userId => {
    const findBakeryList = await RequestedBakery.findAll({
      where: {
        UserId: userId,
      },
      raw: true,
    });
    return findBakeryList;
  },
  acceptBakeryRequest: async (id, isAccept) => {
    if (isAccept) {
      await RequestedBakery.update(
        {
          status: 'REGISTERED',
        },
        { where: { id } },
      );
    } else {
      await RequestedBakery.update(
        {
          status: 'INREVIEW',
        },
        { where: { id } },
      );
    }
  },
};

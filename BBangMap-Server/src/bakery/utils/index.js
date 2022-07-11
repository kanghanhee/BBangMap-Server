const { Bakery, SaveBakery, VisitBakery, Review, User } = require('../../../models');
const { Op } = require('sequelize');
const { sequelize } = require('../../../models/index');
const { defaultBgImg } = require('../../../modules/definition');

module.exports = {
  findBakeryListByBakeryName: async bakeryName => {
    return Bakery.findAll({
      where: {
        [Op.or]: [{ bakeryName: { [Op.like]: `${bakeryName}%` } }, { bakeryName: { [Op.like]: `%${bakeryName}%` } }],
      },
      include: [
        {
          model: Review,
        },
      ],
      //방문 빵집이 많은 순으로 정렬
    });
  },
  findBakeryListByBakeryBestMenu: async bread => {
    return Bakery.findAll({
      where: {
        bestMenu: { [Op.like]: `%${bread}%` },
      },
      // raw: true,
      // nest: true,
      attributes: {},
    });
  },
  findBakeryById: async bakeryId => {
    const findBakery = await Bakery.findOne({
      where: {
        id: bakeryId,
      },
      include: [
        {
          model: Review,
          attributes: {},
          include: [
            {
              model: User,
            },
            {
              model: User,
              as: 'Liker',
            },
            {
              model: User,
              as: 'SaverReview',
            },
          ],
        },
        {
          model: User,
          as: 'SaverBakery',
        },
      ],
    });
    if (findBakery == null) {
      throw new Error('NOT_EXIST_BAKERY');
    }
    return findBakery;
  },
  findUsersSavedBakeryList: async user => {
    return SaveBakery.findAll({
      where: { UserId: user.id },
    });
  },
  findUsersVisitedBakeryList: async user => {
    return VisitBakery.findAll({
      where: { UserId: user.id },
    });
  },
  isSavedBakery: async (bakery, savedBakeryList) => {
    const isContainBakery = savedBakeryList => savedBakeryList.BakeryId === bakery.id;
    return savedBakeryList.some(isContainBakery);
  },
  isVisitedBakery: async (bakery, invitedBakeryList) => {
    const isContainBakery = invitedBakeryList => invitedBakeryList.BakeryId === bakery.id;
    return invitedBakeryList.some(isContainBakery);
  },
  savedBakery: async (userId, bakeryId) => {
    await SaveBakery.findOrCreate({
      where: {
        UserId: userId,
        BakeryId: bakeryId,
      },
    });
  },
  visitedBakery: async (userId, bakeryId) => {
    await VisitBakery.create({ UserId: userId, BakeryId: bakeryId });
  },
  deleteSaveBakery: async (userId, bakeryId) => {
    await SaveBakery.destroy({
      where: {
        UserId: userId,
        BakeryId: bakeryId,
      },
    });
  },
  deleteVisitBakery: async (userId, bakeryId) => {
    await VisitBakery.destroy({
      where: {
        UserId: userId,
        BakeryId: bakeryId,
      },
    });
  },
  getDistance: (lat1, lng1, lat2, lng2) => {
    const deg2rad = deg => {
      return deg * (Math.PI / 180);
    };

    var R = 6371;
    var dLat = deg2rad(lat2 - lat1);
    var dLon = deg2rad(lng2 - lng1);
    var a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;

    return d.toFixed(2);
  },
  filterBakeryByBread: async (searchBakeryByBreadList, bread) => {
    return searchBakeryByBreadList.filter(bakery => {
      return bakery.bestMenu.includes(bread);
    });
  },
  addBakeryImg: async bakery => {
    var originalBakeryImgList = bakery.bakeryImg.length > 0 ? bakery.bakeryImg : [defaultBgImg];

    let reviewImgList = [];
    if (bakery.Reviews.length > 0) {
      bakery.Reviews.map(review => review.reviewImgList)
        .filter(imgList => imgList.length > 0)
        .forEach(imgList => {
          if (imgList.length > 0) {
            reviewImgList = reviewImgList.concat(imgList);
          }
        });
    }
    if (reviewImgList.length > 0) originalBakeryImgList = [];
    bakery.bakeryImg = originalBakeryImgList.concat(reviewImgList);
    return bakery;
  },
  getBakeryStar: reviewList => {
    const starList = reviewList.map(review => review.star);
    const result = starList.reduce((sum, currValue) => {
      return sum + currValue;
    }, 0);

    return result / reviewList.length;
  },
  findOnlyBakery: async bakery => {
    return await Bakery.findByPk(bakery);
  },
  validateDuplicateBakeryInfo: async (bakeryName, address, latitude, longitude) => {
    const findBakery = await Bakery.findOne({
      where: {
        bakeryName: bakeryName,
        address: address,
        latitude: latitude,
        longitude: longitude,
      },
    });

    if (findBakery !== null) throw new Error('DUPLICATE_INFO');
  },
  getRecentVisitedBakeryList: async userId => {
    const bakeryList = await sequelize.query(
      'SELECT B.id,B.address,B.bakeryName FROM VisitBakery as V JOIN Bakery B on B.id = V.BakeryId WHERE UserId = :userId ORDER BY V.createdAt DESC LIMIT 10;',
      {
        replacements: { userId: `${userId}` },
        type: sequelize.QueryTypes.SELECT,
        raw: true,
      },
    );
    return bakeryList;
  },
};

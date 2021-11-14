const { Bakery, Review, User } = require("../../../models");
const { Op } = require("sequelize");

module.exports = {
  findReviewAll: async () => {
    return Review.findAll({
      include: [
        {
          model: Bakery,
          attributes: ["id", "bakeryName"],
        },
      ],
    });
  },
  findReviewListBySearchWord: async (searchWord, isOnline, isVegan) => {
    return Review.findAll({
      where: {
        [Op.and]: [{ isOnline: isOnline }, { isVegan: isVegan }],
      },
      include: [
        {
          model: Bakery,
          where: {
            bakeryName: { [Op.like]: `%${searchWord}%` },
          },
          attributes: ["id", "bakeryName"],
        },
      ],
    });
  },
  findReviewById: async (reviewId) => {
    return Review.findOne({
      where: {
        id: reviewId,
      },
      include: [
        {
          model: User,
          attributes: ["id", "nickName"],
        },
        {
          model: Bakery,
          attributes: ["id", "bakeryName"],
        },
      ],
    });
  },
};

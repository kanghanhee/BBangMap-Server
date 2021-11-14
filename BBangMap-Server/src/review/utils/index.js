const { Bakery, Review } = require("../../../models");
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
};

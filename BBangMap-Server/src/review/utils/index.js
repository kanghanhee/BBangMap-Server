const { Bakery, Review, User, SaveReivew } = require("../../../models");
const { Op } = require("sequelize");

module.exports = {
  findReviewOfBakery: async (bakeryId) => {
    return Review.findAll({
      where: {
        BakeryId: bakeryId,
      },
    });
  },
  findReviewAll: async () => {
    return Review.findAll({
      include: [
        {
          model: Bakery,
          attributes: ["bakeryName"],
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
          attributes: ["bakeryName"],
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
          attributes: ["nickName"],
        },
        {
          model: Bakery,
          attributes: ["bakeryName"],
        },
      ],
    });
  },
  findUsersSavedReviewList: async (user) => {
    return SaveReivew.findAll({
      where: { UserId: user.id },
    });
  },
  isSavedReview: async (review, savedReviewList) => {
    const isContainReview = (savedReviewList) =>
      savedReviewList.ReviewId === review.id;
    return savedReviewList.some(isContainReview);
  },
};

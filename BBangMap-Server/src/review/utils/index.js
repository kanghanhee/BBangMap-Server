const { Bakery, Review, User, SaveReview } = require("../../../models");
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
  findReviewListBySearchWord: async (searchWord) => {
    return Review.findAll({
      include: [
        {
          model: Bakery,
          as: "Bakery",
          attributes: ["bakeryName"],
        },
      ],
      where: {
        [Op.or]: [
          { [`$Bakery.bakeryName$`]: { [Op.like]: `%${searchWord}%` } },
          { purchaseBreadList: { [Op.like]: `%${searchWord}%` } },
        ],
      },
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
    return SaveReview.findAll({
      where: { UserId: user.id },
    });
  },
  findMyReviewList: async (user) => {
    return Review.findAll({
      where: { UserId: user.id },
      include: [
        {
          model: Bakery,
          attributes: ["bakeryName"],
        },
      ],
    });
  },
  addReview: async (
    bakeryId,
    isVegan,
    isOnline,
    purchaseBreadList,
    star,
    content,
    reviewImg
  ) => {
    await Review.create({
      BakeryId: bakeryId,
      isVegan: isVegan,
      isOnline: isOnline,
      purchaseBreadList: purchaseBreadList,
      star: star,
      content: content,
      reviewImg: reviewImg,
    });
  },
  isSavedReview: async (review, savedReviewList) => {
    const isContainReview = (savedReviewList) =>
      savedReviewList.ReviewId === review.id;
    return savedReviewList.some(isContainReview);
  },
  savedReview: async (userId, reviewId) => {
    await SaveReview.create({ UserId: userId, ReviewId: reviewId });
  },
  deleteSavedReview: async (userId, reviewId) => {
    await SaveReview.destroy({
      where: {
        UserId: userId,
        ReviewId: reviewId,
      },
    });
  },
  deleteMyReview: async (userId, reviewId) => {
    await Review.destroy({
      where: {
        UserId: userId,
        id: reviewId,
      },
    });
  },
};

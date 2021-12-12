const { Op } = require('sequelize');
const { Bakery, Review, User, SaveReview, LikeReview } = require('../../../models');

module.exports = {
  findReviewOfBakery: async bakeryId => {
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
          attributes: ['bakeryName'],
        },
      ],
    });
  },
  findReviewListBySearchWord: async (searchWord, isOnline, isVegan) => {
    return Review.findAll({
      include: [
        {
          model: Bakery,
          as: 'Bakery',
          attributes: ['bakeryName'],
        },
      ],
      where: {
        [Op.and]: [
          { isOnline: isOnline },
          { isVegan: isVegan },
          {
            [Op.or]: [
              { [`$Bakery.bakeryName$`]: { [Op.like]: `%${searchWord}%` } },
              { purchaseBreadList: { [Op.like]: `%${searchWord}%` } },
            ],
          },
        ],
      },
    });
  },
  findReviewById: async reviewId => {
    return Review.findOne({
      where: {
        id: reviewId,
      },
      include: [
        {
          model: User,
          attributes: ['nickName'],
        },
        {
          model: Bakery,
          attributes: ['bakeryName'],
        },
      ],
    });
  },
  findUsersSavedReviewList: async user => {
    return SaveReview.findAll({
      where: { UserId: user.id },
    });
  },
  findUsersLikedReviewList: async user => {
    return LikeReview.findAll({
      where: { UserId: user.id },
    });
  },
  findMyReviewList: async user => {
    return Review.findAll({
      where: { UserId: user.id },
      include: [
        {
          model: Bakery,
          attributes: ['bakeryName'],
        },
      ],
    });
  },
  addReview: async (user, bakeryId, isOnline, isVegan, purchaseBreadList, star, content, reviewImgList) => {
    await Review.create({
      UserId: user.id,
      BakeryId: bakeryId,
      isVegan: isVegan,
      isOnline: isOnline,
      purchaseBreadList: purchaseBreadList,
      star: star,
      content: content,
      reviewImgList: reviewImgList,
    });
  },
  isMyReview: async (review, myReviewList) => {
    const isMyReview = myReviewList => myReviewList.id === review.id;
    return myReviewList.some(isMyReview);
  },
  isSavedReview: async (review, savedReviewList) => {
    const isContainReview = savedReviewList => savedReviewList.ReviewId === review.id;
    return savedReviewList.some(isContainReview);
  },
  isLikedReview: async (review, likedReviewList) => {
    const isContainReview = likedReviewList => likedReviewList.ReviewId === review.id;
    return likedReviewList.some(isContainReview);
  },
  savedReview: async (userId, reviewId) => {
    await SaveReview.create({ UserId: userId, ReviewId: reviewId });
  },
  likedReview: async (userId, reviewId) => {
    await LikeReview.create({ UserId: userId, ReviewId: reviewId });
  },
  deleteLikedReview: async (userId, reviewId) => {
    await LikeReview.destroy({
      where: {
        UserId: userId,
        ReviewId: reviewId,
      },
    });
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
  findLikeReviewCount: async reviewId => {
    return await LikeReview.findAndCountAll({
      where: {
        ReviewId: reviewId,
      },
    });
  },
  findLikeReview: async () => {
    return await LikeReview.findAll({});
  },
};

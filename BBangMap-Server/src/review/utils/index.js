const { Op } = require('sequelize');
const { Bakery, Review, User, SaveReview, LikeReview, VisitBakery } = require('../../../models');
// const VisitBakery = require('../../user/model/VisitBakery');

module.exports = {
  findReviewOfBakery: async bakeryId => {
    return Review.findAll({
      where: {
        BakeryId: bakeryId,
      },
      order: [['createdAt', 'DESC']],
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
      order: [['createdAt', 'DESC']],
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
  updateReview: async (
    reviewId,
    user,
    bakeryId,
    isOnline,
    isVegan,
    purchaseBreadList,
    star,
    content,
    reviewImgList,
  ) => {
    await Review.update(
      {
        UserId: user.id,
        BakeryId: bakeryId,
        isVegan: isVegan,
        isOnline: isOnline,
        purchaseBreadList: purchaseBreadList,
        star: star,
        content: content,
        reviewImgList: reviewImgList,
      },
      {
        where: { id: reviewId },
      },
    );
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
  getCount: (id, countList) => {
    let count = countList.filter(count => count === id).length;
    return count;
  },
  // 추천순으로 정렬
  getSortByLikeCount: list => {
    list.sort(function (a, b) {
      return b.likeReviewCount - a.likeReviewCount;
    });
  },
  // 저장한 후기 전체 개수
  getSavedReview: async user => {
    return await SaveReview.findAndCountAll({
      where: {
        UserId: user.id,
      },
    });
  },
  // 저장한 후기 빵집별 개수
  getSavedReviewOfBakery: async (user, bakeryId) => {
    return await User.findAndCountAll({
      where: {
        id: user.id,
      },
      include: [
        {
          model: Review,
          as: 'SavedReview',
          where: { BakeryId: bakeryId },
          attributes: {},
        },
      ],
    });
  },
  // 내가 쓴 후기 개수
  getMyReview: async user => {
    return await Review.findAndCountAll({
      where: {
        UserId: user.id,
      },
    });
  },
  // 방문한 빵집 체크
  checkVisitBakery: async (user, bakeryId) => {
    // 이미 체크했는지 확인 & 없으면 생성
    return await VisitBakery.findOrCreate({
      where: { [Op.and]: [{ UserId: user.id }, { BakeryId: bakeryId }] },
      defaults: {
        UserId: user.id,
        BakeryId: bakeryId,
      },
    });
  },
};

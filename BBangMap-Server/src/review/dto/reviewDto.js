const { defaultBgImg } = require('../../../modules/definition');

const detailDto = (review, userId) => {
  return {
    reviewId: review.id,
    bakeryName: review.Bakery.bakeryName,
    content: review.content,
    reviewer: review.User.nickName,
    reviewImg: review.reviewImgList.length < 1 ? defaultBgImg : review.reviewImgList[0],
    reviewCreatedDate: new Date(review.createdAt + 'z'),
    purchaseBreadList: review.purchaseBreadList,
    isLikedReview: review.Liker.map(liker => liker.id).includes(userId),
    likeReviewCount: review.dataValues.likeReviewCount,
    isSaveReview: review.SaverReview.map(saver => saver.id).includes(userId),
    isVisitedBakery: review.Bakery.VisiterBakery.map(visiter => visiter.id).includes(userId),
  };
};

const summaryDto = review => {
  return {
    reviewId: review.id,
    userId: review.UserId,
    bakeryId: parseInt(review.BakeryId, 10),
    star: parseInt(review.star, 10),
    content: review.content,
    reviewImgList: review.reviewImgList,
    purchaseBreadList: review.purchaseBreadList,
  };
};

module.exports = { detailDto, summaryDto };

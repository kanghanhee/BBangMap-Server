const reviewUtil = require('../utils');

const reviewDetailWithAddressDto = async (review, savedReviewList, likeReviewCount, userId) => {
  return {
    reviewId: review.id,
    bakeryId: review.BakeryId,
    bakeryName: review.BakeryId === null ? '빵집 정보 없음' : review.Bakery.bakeryName,
    address: review.Bakery.address,
    latitude: review.Bakery.latitude,
    longitude: review.Bakery.longitude,
    purchaseBreadList: review.purchaseBreadList,
    star: review.star,
    content: review.content,
    reviewImg: review.reviewImgList.length < 1 ? null : review.reviewImgList,
    reviewerName: review.User.nickName,
    reviewCreatedDate: new Date(review.createdAt + 'z'),
    reviewerImg: review.User.profileImg,
    isSavedReview: await reviewUtil.isSavedReview(review, savedReviewList),
    isMyReview: userId === review.UserId,
    isLikedReview: likeReviewCount.review.UserId === userId,
    likeReviewCount: likeReviewCount.count,
    isVisitedBakery: review.Bakery.VisiterBakery.map(visiter => visiter.id).includes(userId),
  };
};

module.exports = reviewDetailWithAddressDto;

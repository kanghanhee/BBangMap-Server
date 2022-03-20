const reviewUtil = require('../utils');

const reviewDetailDto = async (review, savedReviewList, myReviewList, likedReviewList, likeReviewCount, userId) => {
  console.log(review.User)
  return {
    reviewId: review.id,
    bakeryId: review.BakeryId,
    bakeryName: review.BakeryId === null ? '빵집 정보 없음' : review.Bakery.bakeryName,
    purchaseBreadList: review.purchaseBreadList,
    star: review.star,
    isOnline: review.isOnline,
    isVegan: review.isVegan,
    content: review.content,
    reviewImg: review.reviewImgList.length < 1 ? null : review.reviewImgList,
    reviewerName: review.User.nickName,
    reviewCreatedDate: review.createdAt,
    reviewerImg : review.User.profileImg,
    isSavedReview: await reviewUtil.isSavedReview(review, savedReviewList),
    isMyReview: await reviewUtil.isMyReview(review, myReviewList),
    isLikedReview: await reviewUtil.isLikedReview(review, likedReviewList),
    likeReviewCount: likeReviewCount,
    isVisitedBakery: review.Bakery.VisiterBakery.map(visiter => visiter.id).includes(userId)
  };
};

module.exports = reviewDetailDto;

const reviewUtil = require('../utils');

const reviewDetailDto = async (review, savedReviewList, myReviewList, likedReviewList, likeReviewCount) => {
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
    reviewerName: review.UserId === null ? '존재하지 않는 닉네임' : review.User.nickName,
    reviewCreatedDate: review.createdAt,
    isSavedReview: await reviewUtil.isSavedReview(review, savedReviewList),
    isMyReview: await reviewUtil.isMyReview(review, myReviewList),
    isLikedReview: await reviewUtil.isLikedReview(review, likedReviewList),
    likeReviewCount: likeReviewCount,
  };
};

module.exports = reviewDetailDto;

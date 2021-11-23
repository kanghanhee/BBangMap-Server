const reviewUtil = require("../utils");

const reviewDetailDto = async (review, savedReviewList, myReviewList) => {
  return {
    reviewId: review.id,
    bakeryName: review.Bakery.bakeryName,
    purchaseBreadList: review.purchaseBreadList,
    content: review.content,
    reviewImg: review.reviewImgList,
    reviewerName: review.User.nickName,
    reviewCreatedDate: review.createdAt,
    isSavedReview: await reviewUtil.isSavedReview(review, savedReviewList),
    isMyReview: await reviewUtil.isMyReview(review, myReviewList),
  };
};

module.exports = reviewDetailDto;

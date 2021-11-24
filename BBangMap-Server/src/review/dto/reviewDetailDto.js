const reviewUtil = require("../utils");

const reviewDetailDto = async (review, savedReviewList, myReviewList) => {
  return {
    reviewId: review.id,
    bakeryName:
      review.BakeryId === null ? "빵집 정보 없음" : review.Bakery.bakeryName,
    purchaseBreadList: review.purchaseBreadList,
    content: review.content,
    reviewImg: review.reviewImgList,
    reviewerName:
      review.UserId === null ? "존재하지 않는 닉네임" : review.User.nickName,
    reviewCreatedDate: review.createdAt,
    isSavedReview: await reviewUtil.isSavedReview(review, savedReviewList),
    isMyReview: await reviewUtil.isMyReview(review, myReviewList),
  };
};

module.exports = reviewDetailDto;

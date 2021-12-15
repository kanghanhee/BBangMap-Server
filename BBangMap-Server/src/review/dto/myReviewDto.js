const reviewUtils = require('../utils');

const myReviewDto = (myReview, likedReviewList, likeCountList) => {
  return {
    reviewId: myReview.id,
    bakeryName: myReview.Bakery.bakeryName,
    content: myReview.content,
    reviewImg: myReview.reviewImgList.length < 1 ? null : myReview.reviewImgList[0],
    reviewCreatedDate: myReview.createdAt,
    isLikedReview: !!likedReviewList.includes(myReview.id),
    likeReviewCount: reviewUtils.getCount(myReview.id, likeCountList),
  };
};

module.exports = myReviewDto;

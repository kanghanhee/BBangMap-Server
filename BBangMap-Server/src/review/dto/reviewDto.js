const reviewUtils = require('../utils');

const reviewDto = (review, likedReviewList, likeCountList, userId) => {
  return {
    reviewId: review.id,
    bakeryName: review.Bakery.bakeryName,
    content: review.content,
    // reviewer: review.User.nickName,
    reviewImg: review.reviewImgList.length < 1 ? null : review.reviewImgList[0],
    reviewCreatedDate: review.createdAt,
    purchaseBreadList: review.purchaseBreadList,
    isOnline: review.isOnline,
    isVegan: review.isVegan,
    isLikedReview: !!likedReviewList.includes(review.id),
    likeReviewCount: reviewUtils.getCount(review.id, likeCountList),
    isSaveReview: review.Bakery.SaverBakery.map(saver => saver.id).includes(userId),
    isVisitedBakery: review.Bakery.VisiterBakery.map(visiter => visiter.id).includes(userId)
  };
};

// const getCount = (reviewId, likeCountList) => {
//   let count = 0;
//   for (let i = 0; i < likeCountList.length; i++) {
//     if (likeCountList[i] === reviewId) {
//       count++;
//     }
//   }
//   return count;
// };

module.exports = reviewDto;

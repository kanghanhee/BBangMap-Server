const reviewDto = (review, likedReviewList, likeCountList) => {
  return {
    reviewId: review.id,
    bakeryName: review.Bakery.bakeryName,
    content: review.content,
    reviewImg: review.reviewImgList.length < 1 ? null : review.reviewImgList[0],
    reviewCreatedDate: review.createdAt,
    purchaseBreadList: review.purchaseBreadList,
    isOnline: review.isOnline,
    isVegan: review.isVegan,
    isLikedReview: !!likedReviewList.includes(review.id),
    likeReviewCount: getCount(review.id, likeCountList),
  };
};

const getCount = (reviewId, likeCountList) => {
  let count = likeCountList.filter(likeCount => likeCount === reviewId).length;
  return count;
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

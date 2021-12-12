const myReviewDto = (myReview, likedReviewList, likeCountList) => {
  return {
    reviewId: myReview.id,
    bakeryName: myReview.Bakery.bakeryName,
    content: myReview.content,
    reviewImg: myReview.reviewImgList.length < 1 ? null : myReview.reviewImgList[0],
    reviewCreatedDate: myReview.createdAt,
    isLikedReview: !!likedReviewList.includes(myReview.id),
    likeReviewCount: getCount(myReview.id, likeCountList),
  };
};

const getCount = (reviewId, likeCountList) => {
  let count = likeCountList.filter(likeCount => likeCount === reviewId).length;
  return count;
};

module.exports = myReviewDto;

const myReviewDto = (myReview, likedReviewList) => {
  return {
    reviewId: myReview.id,
    bakeryName: myReview.Bakery.bakeryName,
    content: myReview.content,
    reviewImg: myReview.reviewImgList.length < 1 ? null : myReview.reviewImgList[0],
    reviewCreatedDate: myReview.createdAt,
    isLikedReview: !!likedReviewList.includes(myReview.id),
  };
};

module.exports = myReviewDto;

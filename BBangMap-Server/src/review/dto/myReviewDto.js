const myReviewDto = (myReview) => {
  return {
    reviewId: myReview.id,
    bakeryName: myReview.Bakery.bakeryName,
    content: myReview.content,
    reviewImg: myReview.reviewImgList[0],
    reviewCreatedDate: myReview.createdAt,
  };
};

module.exports = myReviewDto;
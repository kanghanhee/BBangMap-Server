const curationDetailDto = (review, userId) => {
    return {
        reviewId : review.id,
        bakeryName : review.Bakery.bakeryName,
        address : review.Bakery.address,
        reviewImg : review.reviewImgList,
        isVisitedBakery : review.Bakery.VisiterBakery.map(visitor => visitor.id).includes(userId),
        isSavedReview : review.SaverReview.map(saver => saver.id).includes(userId),
        reviewerImg : review.User.profileImg,
        reviewer : review.User.nickName,
        reviewCreatedDate : review.createdAt,
        content : review.content
    }
}

module.exports = curationDetailDto;
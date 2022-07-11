const curationDetailDto = (review, userId) => {
    return {
        reviewId : review.id,
        bakeryId : review.Bakery.id,
        bakeryName : review.Bakery.bakeryName,
        address : review.Bakery.address,
        reviewImg : review.reviewImgList,
        isVisitedBakery : review.Bakery.VisiterBakery.map(visitor => visitor.id).includes(userId),
        isSavedReview : review.SaverReview.map(saver => saver.id).includes(userId),
        reviewerImg : review.User.profileImg,
        reviewer : review.User.nickName,
        reviewCreatedDate : new Date(review.createdAt+"z"),
        content : review.content
    }
}

module.exports = curationDetailDto;
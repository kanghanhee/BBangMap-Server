const reviewOfUserDto = (review) => {
    return {
        "reviewerId" : review.UserId,
        "reviewId" : review.id,
        "bakeryName" : review.Bakery.bakeryName,
        "purchaseBreadList" : review.purchaseBreadList,
        "reviewImgList" : review.reviewImgList,
        "createdAt" : review.createdAt
    }
}

module.exports = reviewOfUserDto;
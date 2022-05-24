const reviewOfUserDto = (review) => {
    return {
        "reviewerId" : review.UserId,
        "reviewId" : review.id,
        "bakeryName" : review.Bakery.bakeryName,
        "createdAt" : review.createdAt
    }
}

module.exports = reviewOfUserDto;
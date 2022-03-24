const reviewOfBakeryDto = require('./reviewOfBakeryDto');

const reviewListOfBakeryDto = (findUser, reviewOfBakeryList, savedReviewList, likedReviewList, visitedBakeryList, likeCountList) => {
    return reviewOfBakeryList.map(reviewOfBakery => {
        return reviewOfBakeryDto(findUser, reviewOfBakery, savedReviewList, likedReviewList, visitedBakeryList, likeCountList);
    });
};

module.exports = reviewListOfBakeryDto;

const bakeryDetailReviewListDto = require('./bakeryDetailReviewListDto')
const bakeryUtil = require('../utils')
const {defaultBgImg} = require("../../../modules/definition");

const bakeryDetailDto = async (bakery, savedBakeryList, invitedBakeryList, userId) => {
    let reviewList = bakery.Reviews
    return {
        bakeryId: bakery.id,
        bakeryName: bakery.bakeryName,
        address: bakery.address,
        mainImg : bakery.bakeryImg[0],
        isVisitedBakery : await bakeryUtil.isVisitedBakery(bakery, invitedBakeryList),
        isSaveBakery : await bakeryUtil.isSavedBakery(bakery, savedBakeryList),
        star: await getBakeryStar(reviewList),
        bakeryImg : await getBakeryDetailImgList(bakery.bakeryImg),
        openTime: bakery.openTime,
        offDay: bakery.offDay,
        bestMenu: bakery.bestMenu,
        isOnline: bakery.isOnline,
        isVegan: bakery.isVegan,
        seasonMenu: bakery.seasonMenu,
        isDrink: bakery.isDrink,
        reviewCount: reviewList.length,
        reviewList: reviewList.map(review => bakeryDetailReviewListDto(review, userId))
    }
}

const getBakeryStar = async (reviewList) => {
    const starList = reviewList.map(review => review.star);
    const result = starList.reduce((sum, currValue) => {
        return sum + currValue;
    }, 0)

    return result / reviewList.length;
}

const getBakeryDetailImgList = async (bakeryImg) => {
    if (bakeryImg.length > 3) {
        let detailImg = [];

        for (let i = 0; i < 3; i++) {
            detailImg.push(bakeryImg[i]);
        }
        return detailImg;
    }
    if(bakeryImg.length === 1 && bakeryImg[0] === defaultBgImg) bakeryImg = [];
    return bakeryImg;
}

module.exports = bakeryDetailDto;
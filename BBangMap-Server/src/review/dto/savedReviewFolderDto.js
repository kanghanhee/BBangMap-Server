const reviewUtils = require('../utils');

const savedReviewFolderDto = (savedReviewFolder, savedReviewCountList) => {
  return {
    bakeryId: savedReviewFolder.Bakery.id,
    bakeryName: savedReviewFolder.Bakery.bakeryName,
    bakeryImg: savedReviewFolder.Bakery.bakeryImg.length < 1 ? null : savedReviewFolder.Bakery.bakeryImg[0],
    isOnline: savedReviewFolder.Bakery.isOnline,
    isVegan: savedReviewFolder.Bakery.isVegan,
    reviewCount: reviewUtils.getCount(savedReviewFolder.BakeryId, savedReviewCountList),
  };
};

module.exports = savedReviewFolderDto;

const savedReviewFolderDto = savedReviewFolder => {
  return {
    bakeryName: savedReviewFolder.Bakery.bakeryName,
    isOnline: savedReviewFolder.isOnline,
    isVegan: savedReviewFolder.isVegan,
  };
};

module.exports = savedReviewFolderDto;

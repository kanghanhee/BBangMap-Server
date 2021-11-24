const savedReviewFolderDto = (savedReviewFolder) => {
  return {
    bakeryName: savedReviewFolder.Bakery.bakeryName,
  };
};

module.exports = savedReviewFolderDto;

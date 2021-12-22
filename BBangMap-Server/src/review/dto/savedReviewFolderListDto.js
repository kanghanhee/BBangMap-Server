const savedReviewFolderDto = require('./savedReviewFolderDto');

const savedReviewFolderListDto = (savedReviewFolderList, savedReviewCountList, totalCount) => {
  return {
    reviewList: savedReviewFolderList.map(savedReviewFolder =>
      savedReviewFolderDto(savedReviewFolder, savedReviewCountList),
    ),
    totalCount: totalCount,
  };
};

module.exports = savedReviewFolderListDto;

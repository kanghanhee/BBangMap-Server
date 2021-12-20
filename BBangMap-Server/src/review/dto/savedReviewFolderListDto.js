const savedReviewFolderDto = require('./savedReviewFolderDto');

const savedReviewFolderListDto = (savedReviewFolderList, savedReviewCountList) => {
  return savedReviewFolderList.map(savedReviewFolder => savedReviewFolderDto(savedReviewFolder, savedReviewCountList));
};

module.exports = savedReviewFolderListDto;

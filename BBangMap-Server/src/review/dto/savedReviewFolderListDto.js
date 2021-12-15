const savedReviewFolderDto = require('./savedReviewFolderDto');

const savedReviewFolderListDto = savedReviewFolderList => {
  return savedReviewFolderList.map(savedReviewFolder => savedReviewFolderDto(savedReviewFolder));
};

module.exports = savedReviewFolderListDto;

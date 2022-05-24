const reviewerInfoDto = require('./ReviewerInfoDto')
const reviewerInfoListDto = (userList) => {
    return userList.map(user => reviewerInfoDto(user));
}

module.exports = reviewerInfoListDto;
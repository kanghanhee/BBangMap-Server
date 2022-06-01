const reviewOfUserDto = require('./reviewOfUserDto')

const reviewListOfUserDto = (reviewList) =>{
    return reviewList.map(review => reviewOfUserDto(review));
}

module.exports = reviewListOfUserDto;
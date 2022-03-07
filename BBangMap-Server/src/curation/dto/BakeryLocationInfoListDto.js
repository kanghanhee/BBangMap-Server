const BakeryLocationInfoDto = require('./BakeryLocationInfoDto')
const bakeryLocationInfoListDto = (bakeryList, userId) => {
    return{
        bakeryLocationInfo : bakeryList.map( bakery => {
            return BakeryLocationInfoDto(bakery, userId)
        })
    }
}

module.exports = bakeryLocationInfoListDto;
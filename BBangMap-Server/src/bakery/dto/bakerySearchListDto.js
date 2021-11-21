const bakerySearchDto = require("./bakerySearchDto")

const bakerySearchListDto = async(searchBakeryList, latitude, longitude) => {
    return searchBakeryList.map(searchBakery => {
        return bakerySearchDto(searchBakery, latitude, longitude);
    })
}

module.exports = bakerySearchListDto;
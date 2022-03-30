const bakerySearchDto = require("./bakerySearchDto")

const bakerySearchListDto = async(searchBakeryList, latitude, longitude, visitedBakeryList, star) => {
    return searchBakeryList.map(searchBakery => {
        return bakerySearchDto(searchBakery, latitude, longitude, visitedBakeryList, star);
    })
}

module.exports = bakerySearchListDto;
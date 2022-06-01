const bakerySearchDto = require("./bakerySearchDto")

const bakerySearchListDto = async(searchBakeryList, latitude, longitude, visitedBakeryList) => {
    return searchBakeryList.map(searchBakery => {
        return bakerySearchDto(searchBakery, latitude, longitude, visitedBakeryList);
    })
}

module.exports = bakerySearchListDto;
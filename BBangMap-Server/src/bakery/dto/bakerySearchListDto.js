const bakerySearchDto = require("./bakerySearchDto")

const bakerySearchListDto = (searchBakeryList) => {
    return searchBakeryList.map(searchBakery => {
        return bakerySearchDto(searchBakery);
    })
}

module.exports = bakerySearchListDto;
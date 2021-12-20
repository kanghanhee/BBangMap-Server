const bakeryMapDto = require('./bakeryMapDto')

const bakeryMapListDto = (bakeryList, savedBakeryList, visitedBakeryList) => {
    return bakeryList.map(bakery => {
        return bakeryMapDto(bakery, savedBakeryList, visitedBakeryList);
    });
}

module.exports = bakeryMapListDto;
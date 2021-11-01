const bakeryMapDto = require('./bakeryMapDto')

const bakeryMapListDto = (bakeryList, savedBakeryList) => {
    return bakeryList.map(bakery => {
        return bakeryMapDto(bakery, savedBakeryList);
    });
}

module.exports = bakeryMapListDto;
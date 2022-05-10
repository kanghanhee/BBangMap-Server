const adminBakeryDetailDto = require('./adminBakeryDetailDto')

const adminBakeryListDto = (bakeryList) => {
    return bakeryList.map(bakery => adminBakeryDetailDto(bakery))
}

module.exports = adminBakeryListDto
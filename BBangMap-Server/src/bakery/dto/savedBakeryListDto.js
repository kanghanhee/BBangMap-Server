const savedBakeryDto = require('./savedBakeryDto')

const savedBakeryListDto = (savedBakeryList) =>{
    return savedBakeryList.map(savedBakery => savedBakeryDto(savedBakery))
}

module.exports = savedBakeryListDto;
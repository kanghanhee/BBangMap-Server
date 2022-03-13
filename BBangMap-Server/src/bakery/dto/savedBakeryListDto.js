const savedBakeryDto = require('./savedBakeryDto')

const savedBakeryListDto = (savedBakeryList) =>{
    return savedBakeryList.map(savedBakery => {
        return savedBakeryDto(savedBakery)
    })
}

module.exports = savedBakeryListDto;
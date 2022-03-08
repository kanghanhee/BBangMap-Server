const BakeryLocationInfoDto = require('./BakeryLocationInfoDto')
const bakeryLocationInfoListDto = (bakeryList, userId) => {
    const filterBakeryId = [];
    const filterBakeryList = [];
    bakeryList.forEach(bakery => {
        if(!filterBakeryId.includes(bakery.id)){
            filterBakeryId.push(bakery.id);
            filterBakeryList.push(bakery);
        }
    })

    return{
        bakeryLocationInfo : filterBakeryList.map( bakery => {
            return BakeryLocationInfoDto(bakery, userId)
        })
    }
}

module.exports = bakeryLocationInfoListDto;
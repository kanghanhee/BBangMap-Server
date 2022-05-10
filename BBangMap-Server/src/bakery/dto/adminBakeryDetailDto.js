const adminBakeryDetailDto = (bakery) =>{
    console.log(bakery.id)
    return{
        id : bakery.id,
        bakeryName : bakery.bakeryName,
        openTime : bakery.openTime,
        offDay : bakery.offDay,
        seasonMenu : bakery.seasonMenu,
        isDrink : bakery.isDrink,
        bestMenu : bakery.bestMenu,
        totalMenu : bakery.totalMenu,
        address : bakery.address,
        latitude : bakery.latitude,
        longitude : bakery.longitude,
        isOnline : bakery.isOnline,
        isVegan : bakery.isVegan,
        bakeryImg : bakery.bakeryImg,
        createdAt : bakery.createdAt,
        updatedAt : bakery.updatedAt
    }
}

module.exports = adminBakeryDetailDto
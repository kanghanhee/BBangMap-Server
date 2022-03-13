const bakeryMapDto = (bakery, savedBakeryList, visitedBakeryList) => {
    return {
        bakeryId: bakery.id,
        latitude: bakery.latitude,
        longitude: bakery.longitude,
        isSaveBakery: savedBakeryList.includes(bakery.id),
        isVisitedBakery: visitedBakeryList.includes(bakery.id),
        bakeryName : bakery.bakeryName,
        bakeryAddress : bakery.address,
        start : bakery.star,
        star : bakery.star
    }
}

module.exports = bakeryMapDto;
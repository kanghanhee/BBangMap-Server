const bakeryMapDto = (bakery, savedBakeryList, visitedBakeryList) => {
    return {
        bakeryId: bakery.id,
        latitude: bakery.latitude,
        longitude: bakery.longitude,
        isSaveBakery: savedBakeryList.includes(bakery.id),
        isVisitedBakery : visitedBakeryList.includes(bakery.id)
    }
}

module.exports = bakeryMapDto;
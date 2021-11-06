const bakeryMapDto = (bakery, savedBakeryList) => {
    return {
        bakeryId: bakery.id,
        latitude: bakery.latitude,
        longitude: bakery.longitude,
        isSaveBakery: !!savedBakeryList.includes(bakery.id)
    }
}

module.exports = bakeryMapDto;
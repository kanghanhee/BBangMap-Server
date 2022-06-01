const adminBakeryDetailDto = (bakery) => {
    return {
        id: bakery.id,
        bakeryName: bakery.bakeryName,
        openTime: bakery.openTime,
        offDay: bakery.offDay,
        seasonMenu: bakery.seasonMenu,
        isDrink: bakery.isDrink,
        bestMenu: bakery.bestMenu,
        totalMenu: bakery.totalMenu,
        address: bakery.address,
        latitude: bakery.latitude,
        longitude: bakery.longitude,
        isOnline: bakery.isOnline,
        isVegan: bakery.isVegan,
        isAllTheTime: bakery.isAllTheTime,
        isIrregularPeriod: bakery.isIrregularPeriod,
        isParkingAvailable: bakery.isParkingAvailable,
        isChildAvailable: bakery.isChildAvailable,
        isReservationAvailable: bakery.isReservationAvailable,
        isPetAvailable: bakery.isPetAvailable,
        blog: bakery.blog,
        instagram: bakery.instagram,
        bakeryImg: bakery.bakeryImg,
        createdAt: bakery.createdAt,
    }
}

module.exports = adminBakeryDetailDto
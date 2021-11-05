const savedBakeryDto = (savedBakery) =>{
    return {
        bakeryId : savedBakery.id,
        bakeryName : savedBakery.bakeryName,
        bakeryImg : savedBakery.bakeryImg.length < 1 ? null : savedBakery.bakeryImg[0],
        isOnline : savedBakery.isOnline,
        isVegan : savedBakery.isVegan
    }
}

module.exports = savedBakeryDto
const bakerySearchDto = (searchBakery) => {
    return {
        bakeryId: searchBakery.id,
        bakeryName: searchBakery.bakeryName
    }
}

module.exports = bakerySearchDto;
const bakerySearchDto = require('./bakerySearchDto');

const bakerySearchIntegrationDto = async (
  searchBakeryList,
  filteredBreadList,
  latitude,
  longitude,
  visitedBakeryList,
) => {
  return {
    bakeryList: searchBakeryList.map(bakery => bakerySearchDto(bakery, latitude, longitude, visitedBakeryList)),
    breadList: filteredBreadList,
    bakeryTotalCount: searchBakeryList.length,
    breadTotalCount: filteredBreadList.length,
  };
};

module.exports = bakerySearchIntegrationDto;

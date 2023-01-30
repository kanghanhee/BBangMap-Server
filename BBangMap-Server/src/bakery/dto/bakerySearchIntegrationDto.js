const areaDto = require('./areaDto');
const bakerySearchDto = require('./bakerySearchDto');

const bakerySearchIntegrationDto = async (
  searchBakeryList,
  filteredBreadList,
  kakaoAreaList,
  latitude,
  longitude,
  visitedBakeryList,
) => {
  return {
    bakeryList: searchBakeryList.map(bakery => bakerySearchDto(bakery, latitude, longitude, visitedBakeryList)),
    breadList: filteredBreadList,
    areaList: await Promise.all(kakaoAreaList.map(area => areaDto(area))),
    bakeryTotalCount: searchBakeryList.length,
    breadTotalCount: filteredBreadList.length,
    areaTotalCount: kakaoAreaList.length,
  };
};

module.exports = bakerySearchIntegrationDto;

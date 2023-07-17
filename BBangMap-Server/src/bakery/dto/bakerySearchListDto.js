const bakerySearchDto = require('./bakerySearchDto');

const bakerySearchListDto = (searchBakeryList, latitude, longitude, visitedBakeryList) => {
  return Promise.all(
    searchBakeryList.map(searchBakery => {
      return bakerySearchDto(searchBakery, latitude, longitude, visitedBakeryList);
    }),
  );
};

module.exports = bakerySearchListDto;

const { findBreadImage } = require('../../review/utils');

const popularBreadListDto = async popularBreadList => {
  const transformedBreadList = await Promise.all(
    popularBreadList
      .filter((item, index) => index % 2 === 0)
      .map(async item => ({
        breadName: item.breadName,
        breadImg: await findBreadImage(item.breadName),
        searchCount: popularBreadList[popularBreadList.indexOf(item) + 1],
      })),
  );
  return transformedBreadList;
};

module.exports = { popularBreadListDto };

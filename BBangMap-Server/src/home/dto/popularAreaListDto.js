const popularAreaListDto = popularAreaList => {
  return popularAreaList
    .map((item, index) => {
      if (index % 2 === 0) {
        return {
          areaName: item.areaName,
          bakeryCount: item.bakeryCount,
          searchCount: popularAreaList[index + 1],
        };
      }
    })
    .filter(Boolean);
};

module.exports = { popularAreaListDto };

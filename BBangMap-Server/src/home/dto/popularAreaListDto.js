const popularAreaListDto = popularAreaList => {
  return popularAreaList.reduce((result, item, index) => {
    if (index % 2 === 0) {
      const area = {
        areaName: item.areaName,
        bakeryCount: item.bakeryCount,
        searchCount: popularAreaList[index + 1],
      };
      result.push(area);
    }
    return result;
  }, []);
};

module.exports = { popularAreaListDto };

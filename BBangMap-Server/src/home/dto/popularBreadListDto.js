const popularBreadListDto = popularBreadList => {
  return popularBreadList
    .map((item, index) => {
      if (index % 2 === 0) {
        return {
          breadName: item.breadName,
          breadImg: item.breadImg,
          searchCount: popularBreadList[index + 1],
        };
      }
    })
    .filter(Boolean);
};

module.exports = { popularBreadListDto };

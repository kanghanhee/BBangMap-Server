const popularBreadListDto = popularBreadList => {
  return popularBreadList.reduce((result, item, index) => {
    if (index % 2 === 0) {
      const bread = {
        breadName: item.breadName,
        breadImg: item.breadImg,
        searchCount: popularBreadList[index + 1],
      };
      result.push(bread);
    }
    return result;
  }, []);
};

module.exports = { popularBreadListDto };

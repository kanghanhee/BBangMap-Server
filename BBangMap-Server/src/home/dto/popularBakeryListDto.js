const popularBakeryListDto = popularBakeryList => {
  return popularBakeryList.reduce((result, item, index) => {
    if (index % 2 === 0) {
      const bakery = {
        bakeryId: item.id,
        bakeryName: item.bakeryName,
        bakeryImg: item.bakeryImg.length !== 0 ? item.bakeryImg[0] : '',
        address: item.address,
        searchCount: popularBakeryList[index + 1],
      };
      result.push(bakery);
    }
    return result;
  }, []);
};

module.exports = { popularBakeryListDto };

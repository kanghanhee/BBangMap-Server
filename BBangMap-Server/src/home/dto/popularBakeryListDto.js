const popularBakeryListDto = popularBakeryList => {
  return popularBakeryList
    .map((item, index) => {
      if (index % 2 === 0) {
        return {
          bakeryId: item.id,
          bakeryName: item.bakeryName,
          bakeryImg: item.bakeryImg.length !== 0 ? item.bakeryImg[0] : '',
          address: item.address,
          latitude: item.latitude,
          longitude: item.longitude,
          searchCount: popularBakeryList[index + 1],
        };
      }
    })
    .filter(Boolean);
};

module.exports = { popularBakeryListDto };

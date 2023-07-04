const { findRequestedBakeryByBakeryName } = require('../../bakery/utils');

const bakeryListDto = async latestBakeryList => {
  const bakeryList = await Promise.all(
    latestBakeryList.map(async item => {
      return {
        bakeryId: item.id,
        bakeryName: item.bakeryName,
        address: item.address,
        subtitle: await findRequestedBakeryByBakeryName(item.bakeryName),
        registeredAt: item.createdAt,
      };
    }),
  );

  return bakeryList;
};

module.exports = { bakeryListDto };

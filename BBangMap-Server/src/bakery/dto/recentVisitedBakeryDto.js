const recentVisitedBakeryDto = bakery => {
  return {
    id: bakery.id,
    name: bakery.bakeryName,
    address: bakery.address,
  };
};

module.exports = recentVisitedBakeryDto;

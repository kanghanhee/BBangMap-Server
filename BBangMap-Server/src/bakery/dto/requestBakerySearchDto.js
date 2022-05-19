const requestBakerySearchDto = (name, address, id, isRegistered) => {
  return {
    name,
    address,
    id,
    isRegistered,
  };
};
module.exports = requestBakerySearchDto;

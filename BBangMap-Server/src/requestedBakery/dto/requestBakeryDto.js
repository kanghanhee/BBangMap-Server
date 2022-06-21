const requestBakeryDto = (id, name, address, status) => {
  return {
    id,
    name,
    address,
    status,
  };
};
module.exports = requestBakeryDto;

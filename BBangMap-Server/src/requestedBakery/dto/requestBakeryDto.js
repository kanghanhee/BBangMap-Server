const requestBakeryDto = (id, name, address, status, reason) => {
  return {
    id,
    name,
    address,
    status,
    reason,
  };
};
module.exports = requestBakeryDto;

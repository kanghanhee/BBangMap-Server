const requestBakeryDetailDto = (id, placeId, userId, name, address, latitude, longitude, status, reason) => {
  return {
    id,
    placeId,
    name,
    address,
    latitude,
    longitude,
    status,
    reason,
  };
};
module.exports = requestBakeryDetailDto;

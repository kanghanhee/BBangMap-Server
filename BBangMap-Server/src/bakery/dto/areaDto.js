const areaDto = area => {
  return {
    area: area.place_name,
    areaLongitude: area.x,
    areaLatitude: area.y,
  };
};

module.exports = areaDto;

const areaDto = async area => {
  return {
    area: area.place_name,
    areaLongitude: parseFloat(area.x),
    areaLatitude: parseFloat(area.y),
  };
};

module.exports = areaDto;

const bakeryUtil = require('../utils');

const areaDto = async area => {
  return {
    area: area.place_name,
    areaLongitude: parseFloat(area.x),
    areaLatitude: parseFloat(area.y),
    bakeryCountByArea: (await bakeryUtil.findBakeryByArea(area.y, area.x, 3)).length,
  };
};

module.exports = areaDto;

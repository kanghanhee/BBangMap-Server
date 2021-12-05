/* eslint-disable no-return-await */
const { sequelize } = require('../index');

module.exports = {
  scopeOfTheMapRange: async (latitude, longitude, radius) => {
    return await sequelize.query(
      'SELECT b.id, b.latitude, b.longitude, (6371 * acos(cos(radians(:latitude)) * cos(radians(latitude)) * cos(radians(longitude) - radians(:longitude)) +sin(radians(:latitude)) * sin(radians(latitude)))) AS distance FROM Bakery b HAVING distance < :radius ORDER BY distance;',
      {
        replacements: { latitude: `${latitude}`, longitude: `${longitude}`, radius: `${radius}` },
        type: sequelize.QueryTypes.SELECT,
        raw: true,
      },
    );
  },
};

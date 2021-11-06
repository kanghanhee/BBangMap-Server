const {sequelize} = require('../index')

module.exports = {
    scopeOfTheMapRange: async (latitude, longitude) => {
        return await sequelize.query('SELECT b.id, b.latitude, b.longitude, (6371 * acos(cos(radians(:latitude)) * cos(radians(latitude)) * cos(radians(longitude) - radians(:longitude)) +sin(radians(:latitude)) * sin(radians(latitude)))) AS distance FROM Bakery b HAVING distance < 1 ORDER BY distance;',
            {
                replacements: {latitude: `${latitude}`, longitude: `${longitude}`},
                type: sequelize.QueryTypes.SELECT,
                raw: true
            }
        );
    }
}
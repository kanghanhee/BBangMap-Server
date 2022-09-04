const {SearchLocation} = require('../../../models')

module.exports = {
    saveSearchLocation: async (latitude, longitude, radius) => {
        await SearchLocation.create({latitude: latitude, longitude: longitude, radius: radius});
    }
}
const {Bakery} = require('../../../models')
const {Op} = require('sequelize')

module.exports = {
    getBakeryListByBakeryName: async (bakeryName) => {
        console.log('bakeryName : ', bakeryName)
        return Bakery.findAll({
            where: {
                [Op.or]:[
                    {bakeryName: {[Op.like]: `${bakeryName}%`}},
                    {bakeryName: {[Op.like]: `%${bakeryName}%`}}
                ]
            }
            //방문 빵집이 많은 순으로 정렬
        })
    }
}
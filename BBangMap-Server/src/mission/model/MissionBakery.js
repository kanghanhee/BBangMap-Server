module.exports = (sequelize, DataTypes) => {
    return sequelize.define('MissionBakery', {
        MissionId:{
          type:DataTypes.INTEGER,
          references:{
              model:'Mission',
              key:'id'
          }
        },
        BakeryId:{
            type:DataTypes.INTEGER,
            references:{
                model: 'Bakery',
                key: 'id'
            }
        }
    },{
        freezeTableName: true,
        timestamps: true
    })
}
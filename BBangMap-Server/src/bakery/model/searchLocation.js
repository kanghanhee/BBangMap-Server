module.exports = (sequelize, DataTypes) => {
    return sequelize.define(
        'SearchLocation',
        {
            latitude: {
                type: DataTypes.DOUBLE,
                allowNull: false
            },
            longitude: {
                type: DataTypes.DOUBLE,
                allowNull: false
            },
            radius: {
                type: DataTypes.DOUBLE,
                allowNull: false
            }
        },
        {
            freezeTableName: true,
            timestamps: true
        }
    )
}
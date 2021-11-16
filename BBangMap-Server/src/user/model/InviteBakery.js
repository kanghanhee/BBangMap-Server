module.exports = (sequelize, DataTypes) => {
    return sequelize.define('InviteBakery', {
        UserId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'User',
                key: 'id'
            }
        },
        BakeryId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Bakery',
                key: 'id'
            }
        }
    }, {
        freezeTableName: true,
        timestamps: true
    })
}
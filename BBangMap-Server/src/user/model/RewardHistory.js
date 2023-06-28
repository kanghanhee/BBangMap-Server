module.exports = (sequelize, DataTypes) => {
    return sequelize.define(
        'RewardHistory',
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            UserId: {
                type: DataTypes.INTEGER,
                references: {
                    model: 'User',
                    key: 'id',
                },
                allowNull: false
            },
            reward: {
                type: DataTypes.INTEGER,
                define: 0,
                allowNull: false
            },
            acquisitionMethod: {
                type: DataTypes.STRING(100),
                allowNull: false
            }
        },
        {
            freezeTableName: true,
            timestamps: true,
        }
    )
}
module.exports = (sequelize, DataTypes) => {
    return sequelize.define('LikeReview', {
        UserId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'User',
                key: 'id'
            }
        },
        ReviewId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Review',
                key: 'id'
            }
        }
    }, {
        freezeTableName: true,
        timestamps: true
    })
}
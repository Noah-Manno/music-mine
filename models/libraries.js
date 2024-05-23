const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const User = require('./user')

class Libraries extends Model { }

Libraries.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true, 
            autoIncrement: true
        },
        title: {
            type: DataTypes.TEXT,
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: User,
                key: 'id'
            }
        },
    },
    {
        sequelize,
        timestamps: true,
        freezeTableName: true,
        underscored: true,
        modelName: 'libraries'
    }
);

User.hasMany(Libraries, {
    foreignKey: 'user_id'
});

Libraries.belongsTo(User, {
    foreignKey: 'user_id'
});

module.exports = Libraries;
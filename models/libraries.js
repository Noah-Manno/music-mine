const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const User = require('./user')

class Libraries extends Model { }

Libraries.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true, 
            autoIncrement: true
        },
        title: {
            type: DataTypes.TEXT,
            allowNull: false,
            unique: true,
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
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
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const User = require('./user.js')
const Music = require('./music.js')

class Concerts extends Model {}

Concerts.init(
    {
        concert_id: {
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
        concert_type: {
            type: DataTypes.TEXT,
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
        modelName: 'concerts'
    }
);

module.exports = Concerts;
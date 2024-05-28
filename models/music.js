const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const Libraries = require('./libraries')
const Concerts = require('./concerts')

class Music extends Model { }

Music.init(
    {
        piece_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: DataTypes.STRING
        },
        composer: {
            type: DataTypes.STRING
        },
        ensemble: {
            type: DataTypes.STRING
        },
        challenge: {
            type: DataTypes.STRING
        },
        voicing: {
            type: DataTypes.STRING
        },
        language: {
            type: DataTypes.STRING
        },
        desc: {
            type: DataTypes.STRING
        },
        library_id: {
            type: DataTypes.INTEGER,
            references: {
                model: Libraries,
                key: 'id'
            }
        },
    },
    {
        sequelize,
        timestamps: true,
        freezeTableName: true,
        underscored: true,
        modelName: 'music'
    }
);

module.exports = Music;
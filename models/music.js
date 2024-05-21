const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const User = require('./user')

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
        modelName: 'music'
    }
);

User.hasMany(Music, {
    foreignKey: 'user_id'
});

Music.belongsTo(User, {
    foreignKey: 'user_id'
});

module.exports = Music;
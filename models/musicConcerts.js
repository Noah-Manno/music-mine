const { Model, DataTypes } = require('sequelize');
const Concerts = require('./concerts')
const Music = require('./music')

const sequelize = require('../config/connection');

class MusicConcerts extends Model {}

MusicConcerts.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    concert_id: {
      type: DataTypes.INTEGER,
      references: {
        model: Concerts,
        key: 'concert_id'
      }
    },
    piece_id: {
      type: DataTypes.INTEGER,
      references: {
        model: Music,
        key: 'piece_id'
      }
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'musicConcerts',
  }
);

Music.belongsToMany(Concerts, {
    through: 'musicConcerts',
    foreignKey: 'piece_id'
});

Concerts.belongsToMany(Music, {
    through: 'musicConcerts',
    foreignKey: 'concert_id'
});

module.exports = MusicConcerts;
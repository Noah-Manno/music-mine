const User = require('./user');
const Libraries = require('./libraries')
const Concerts = require('./concerts')
const Music = require('./music')


User.hasMany(Libraries, {
    foreignKey: 'user_id'
});

User.hasMany(Concerts, {
    foreignKey: 'user_id'
});

Libraries.belongsTo(User, {
    foreignKey: 'user_id'
});

Concerts.belongsTo(User, {
    foreignKey: 'user_id'
});

Libraries.hasMany(Music, {
    foreignKey: 'library_id'
});

Music.belongsTo(Libraries, {
    foreignKey: 'library_id'
});

module.exports = { User, Libraries, Concerts, Music }
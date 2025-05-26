const sequelize = require('../config/db');
const User = require('./user');
const Store = require('./store');
const Rating = require('./rating');

// Associations
User.hasMany(Rating);
Rating.belongsTo(User);

Store.hasMany(Rating);
Rating.belongsTo(Store);

Store.belongsTo(User, { as: 'owner' }); // Store Owner

module.exports = { sequelize, User, Store, Rating };

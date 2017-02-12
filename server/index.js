'use strict';

// const Sequelize = require('sequelize');
const Play = require('./api/plays/play.model');
const User = require('./api/users/user.model');
const OAuth = require('./api/auth/oauth.model');

OAuth.belongsTo(User);
User.hasOne(OAuth);

User.hasMany(Play, {foreignKey: 'player_id'});

module.exports = {Play, User, OAuth};

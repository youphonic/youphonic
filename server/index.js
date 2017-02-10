'use strict';

const Sequelize = require('sequelize');
var Play = require('./api/plays/play.model');
var User = require('./api/users/user.model');
var OAuth = require('./api/auth/oauth.model');

OAuth.belongsTo(User);
User.hasOne(OAuth);

User.hasMany(Play, {foreignKey: 'player_id'});

module.exports = {Play, User, OAuth};

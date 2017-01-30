'use strict';

const Sequelize = require('sequelize');
var Play = require('./api/plays/play.model');
var User = require('./api/users/user.model');

User.hasMany(Play, {foreignKey: 'player_id'});

module.exports = {Play, User};

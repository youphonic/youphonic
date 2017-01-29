'use strict';

var Sequelize = require('sequelize');
var databaseURI = 'postgres://localhost:5432/musicmachine';

module.exports = new Sequelize(databaseURI, {
    logging: false
});

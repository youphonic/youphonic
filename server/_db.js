'use strict';

var Sequelize = require('sequelize');

var databaseURI = 'postgres://localhost:5432/musicmachine';

var db = new Sequelize(databaseURI, {
    logging: false
});

module.exports = db;

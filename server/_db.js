'use strict';

var Sequelize = require('sequelize');

var databaseURI = 'postgres://localhost:5432/musicmachine';

var db = new Sequelize(databaseURI, {
    define: {
        timestamps: false,
        underscored: true
    },
	//TODO: turn off logging after db setup
    logging: true
});

module.exports = db;

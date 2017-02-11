'use strict';

var Sequelize = require('sequelize');

var databaseURI = process.env.DATABASE_URL || `postgres://localhost:5432/musicmachine`;

const db = module.exports = new Sequelize(databaseURI, {
		logging: false
});

// Tests if we're in test mode or not
// by looking for Mocha's global.it function
let isInTest = typeof global.it === 'function';

// sync the db, creating it if necessary
function sync(force=isInTest) {
  return db.sync({force}) // true if in tests, false if not
    .then(ok => console.log('Synced models'))
}

db.didSync = sync()

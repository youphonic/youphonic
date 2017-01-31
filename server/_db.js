'use strict';

var Sequelize = require('sequelize');
var databaseURI = 'postgres://localhost:5432/musicmachine';

const db = module.exports = new Sequelize(databaseURI, {
		logging: false
});

// sync the db, creating it if necessary
function sync() {
  return db.sync()  //{force: true}
    .then(ok => console.log('Synced models'))
}

db.didSync = sync()

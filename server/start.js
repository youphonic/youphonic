require('babel-register');
const pkg = require('../index.js');

const app = require('./app');
const db = require('./_db');


app.listen(app.get('port'), (err) => {
	if (err) throw err;
  console.log(`server for ${pkg.name} listening on port ${app.get('port')}`);
	db.sync() //
	.then( () => {
		console.log('...and postgres server is connected')
	});
});

require('babel-register');

const app = require('./app');
const db = require('./db');

app.listen(app.get('port'), (err) => {
	if (err) throw err;
  console.log(`server listening on port ${app.get('port')}`);
	db.sync({force: true})
	.then( () => {
		console.log('...and postgres server is connected')
	});
});

'use strict';
const api = module.exports = require('express').Router();
api.get('/heartbeat', (req, res) => res.send({ok: true}))
  .use('/users', require('./users/users.routes'))
	.use('/plays', require('./plays/plays.routes'))
  .use('/auth', require('./auth/auth.routes'))
	.use((err, req, res, next) => {
		console.log('ERR', err);
	  res.status(500).send(err);
	});

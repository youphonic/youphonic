'use strict';
const api = module.exports = require('express').Router();
api.get('/heartbeat', (req, res) => res.send({ok: true}))
//uncomment routes when they are ready
  .use('/users', require('./users/users.routes'))
	.use('/plays', require('./plays/plays.routes'))
  .use('/auth', require('./auth/auth.routes'));
//.use('/chunks', require('./chunks/chunks.routes'))
// route error handling
api.use((err, req, res, next) => {
  res.status(500).send(err);
});

'use strict';

const api = module.exports = require('express').Router();

api
  .get('/heartbeat', (req, res) => res.send({ok: true}))
  .use('/users', require('./users/users'))
  .use('/chunks', require('./chunks/chunks'))
  .use('/plays', require('./plays/plays'));

// route error handling
api.use((err, req, res, next) => {
  res.status(500).send(err);
});

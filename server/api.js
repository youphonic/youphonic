'use strict';

const api = module.exports = require('express').Router();

api
  .get('/heartbeat', (req, res) => res.send({ok: true}))
  // .use('/auth', require('./auth'))
  // .use('/users', require('./users'))
  // .use('/chunks', require('./chunks'))
  // .use('/plays', require('./plays'))

// Send along any errors
api.use((err, req, res, next) => {
  res.status(500).send(err);
});

// No routes matched? 404.
api.use((req, res, next) => res.status(404).end());

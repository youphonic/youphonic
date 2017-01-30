'use strict'

var db = require('../../_db');
const Play = require('./play.model')
const {mustBeLoggedIn, forbidden} = require('../auth/auth.filters')

module.exports = require('express').Router()

	.param('id', function (req, res, next, id) {
	  Play.findById(id)
	  .then(function (play) {
	    req.requestedPlay = play;
	    next();
	  })
	  .catch(next)
	})

	.get('/', (req, res, next) =>
		Play.findAll()
		.then(plays => res.json(plays))
		.catch(next))

	.post('/', (req, res, next) => {
		Play.create(req.body)
		.then(play => res.status(201).json(play))
		.catch(next)
	})

// this will require recipient to register to view a play they were sent
// consider having them be able to view play outside app
// TODO: discuss this as it relates to stickiness strategy
	.get('/:id', mustBeLoggedIn, (req, res, next) =>
	res.json(req.requestedUser))

	.get('/:id/plays', mustBeLoggedIn, (req, res, next) =>
	res.json(req.requestedUser.plays[0]))


	.put('/:id', (req, res, next) => {
		req.requestedPlay.update(req.body)
		.then(updatedPlay => {
			res.send(updatedPlay)
		})
		.catch(next)
	})

	.delete('/:id', function (req, res, next) {
	  req.requestedPlay.destroy()
	  .then( () => res.status(204).end())
	  .catch(next);
  });

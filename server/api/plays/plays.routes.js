'use strict'

var db = require('../../_db');
const Play = require('./play.model')
const {mustBeLoggedIn, forbidden} = require('../auth/auth.filters')

module.exports = require('express').Router()

// sets found play on req for later routes
	.param('hashedPlay', function (req, res, next, hashedPlay) {
	  Play.findOne(
			{where: {hashedPlay: hashedPlay}})
	  .then(function (play) {
	    req.requestedPlay = play;
	    next();
	  })
	  .catch(next)
	})

// get all plays, must be logged in (ideally as admin)
	.get('/', (req, res, next) =>
		Play.findAll()
		.then(plays => res.json(plays))
		.catch(next))

// create one play, must be logged in
	.post('/', mustBeLoggedIn, (req, res, next) => {
		Play.create(req.body)
		.then(play => res.status(201).json(play))
		.catch(next)
	})

// get one play, doesn't require login for viewing shared play
	.get('/:hashedPlay', (req, res, next) =>
	res.json(req.requestedPlay))

// get all plays for one user, requires that user be logged in
	.get('/:userId', mustBeLoggedIn, (req, res, next) =>
		Play.findAll({
			where: {player_id: +userId}
		})
		.then(plays => res.json(plays))
		.catch(next)
		)

// update one play, must be logged in
	.put('/:hashedPlay', mustBeLoggedIn, (req, res, next) => {
		req.requestedPlay.update(req.body)
		.then(updatedPlay => {
			res.send(updatedPlay)
		})
		.catch(next)
	})

// delete one play, must be logged in
	.delete('/:hashedPlay', mustBeLoggedIn, function (req, res, next) {
	  req.requestedPlay.destroy()
	  .then( () => res.status(204).end())
	  .catch(next);
  });

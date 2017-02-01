'use strict'

var db = require('../../_db');
const User = require('./user.model')
const Play = require('../plays/play.model')
const {mustBeLoggedIn, forbidden} = require('../auth/auth.filters')

module.exports = require('express').Router()
	.param('id', function (req, res, next, id) {
		console.log('user id ', id);
	  User.findById(id)
	  .then(function (user) {
			console.log('user ', user);
	    req.requestedUser = user;
	    next();
	  })
	  .catch(next);
	})

	//we won't need to use this we implement unless admin feature
	// .get('/', (req, res, next) =>
	// 	User.findAll()
	// 	.then(users => res.json(users))
	// 	.catch(next))

	.post('/', (req, res, next) => {
		console.log('in the user post route', req.body);
		User.create(req.body)
		.then(user => res.status(201).json(user))
		.catch(next);
	})

	.get('/:id', mustBeLoggedIn, (req, res, next) =>
	res.json(req.requestedUser))

	.get('/:id/plays', mustBeLoggedIn, (req, res, next) =>
	res.json(req.requestedUser.plays[0]))


//updates user instance
	.put('/:id', (req, res, next) => {
		req.requestedUser.update(req.body)
		.then(updatedUser => {
			res.send(updatedUser);
		})
		.catch(next);
	})

	// saves a user's play
	.put('/:id/plays', (req, res, next) => {
		const userId = req.params.id;
		Play.findOrCreate({where: {id: req.body.id}})
		.spread((play, created) => {
			if (!created) {
				play.update({player_id: userId, playJSON: req.body})
				.then(play => res.send(play));
			} else {
				res.send(play);
			}
		})
		.catch(next);
	})

	.delete('/:id', function (req, res, next) {
	  req.requestedUser.destroy()
	  .then( () => res.status(204).end())
	  .catch(next);
  });

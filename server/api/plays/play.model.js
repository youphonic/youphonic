'use strict'

const Sequelize = require('sequelize')
var db = require('../../_db')
const bcrypt = require('bcrypt')

const Play = db.define('plays', {
  playJson: {
	  type: Sequelize.JSON,
	  allowNull: false
  },
	hashedPlay: {
		type: Sequelize.STRING
	}
}, {
	hooks: {
		beforeValidate: setHashedPlay,
		beforeUpdate: setHashedPlay
	}
});

	// hash the play data to use as secure parameter in get one route for sharing model
function setHashedPlay(play) {
  return new Promise((resolve, reject) =>
	  bcrypt.hash(play.get('playJson'), 10, (err, hash) => {
		  if (err) reject(err)
		  play.set('hashedPlay', hash)
      resolve(play)
	  })
  )
}

module.exports = Play

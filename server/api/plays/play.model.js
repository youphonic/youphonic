'use strict';

const Sequelize = require('sequelize');
var db = require('../../_db');
const bcrypt = require('bcrypt');

const Play = db.define('plays', {
	title: {
		type: Sequelize.STRING,
		allowNull: false
	},
  playJson: {
	  type: Sequelize.JSON,
	  allowNull: false
  },
	hashedPlay: {
		type: Sequelize.STRING
	},
	image: {
		type: Sequelize.TEXT
	}
}, {
	hooks: {
		beforeValidate: setHashedPlay,
		beforeUpdate: setHashedPlay
	}
});

	// hash the play data to use as secure parameter in get one route for sharing model
function setHashedPlay(play) {
	let string = JSON.stringify(play.get('playJson'));
  return new Promise((resolve, reject) =>
	  bcrypt.hash(string, 10, (err, hash) => {
		  if (err) reject(err);

			let sanitized = hash.replace(/[^$\w]+/g, '');
		  play.set('hashedPlay', sanitized);
      resolve(play);
	  })
  );
}

module.exports = Play;

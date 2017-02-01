'use strict'

const bcrypt = require('bcrypt')
const Sequelize = require('sequelize')
var db = require('../../_db')

const User = db.define('users', {
  userName: {
	  type: Sequelize.STRING
  },
  firstName: Sequelize.STRING,
  lastName: Sequelize.STRING,
  email: {
    type: Sequelize.STRING,
    validate: {
			isEmail: true,
			notEmpty: true,
		}
  },

  // We support oauth, so users may or may not have passwords.
	passwordDigest: Sequelize.STRING,
	password: {
		type: Sequelize.VIRTUAL
	},
	googleId: {
		type: Sequelize.STRING
	}
}, {
	indexes: [{fields: ['email'], unique: true}],
  scopes: {
		orders: () => ({
			include: [{
				model: db.model('orders').scope('lineItems')
			}]
		})
	},
  hooks: {
    beforeCreate: setEmailAndPassword,
    beforeUpdate: setEmailAndPassword,
  },
  instanceMethods: {
    authenticate(plaintext) {
      return new Promise((resolve, reject) =>
        bcrypt.compare(plaintext, this.passwordDigest,
          (err, result) =>
            err ? reject(err) : resolve(result))
        )
    }
  }
})

function setEmailAndPassword(user) {
  user.email = user.email && user.email.toLowerCase()
  if (!user.password) return Promise.resolve(user)

  return new Promise((resolve, reject) =>
	  bcrypt.hash(user.get('password'), 10, (err, hash) => {
		  if (err) reject(err)
		  user.set('passwordDigest', hash)
      resolve(user)
	  })
  )
}

module.exports = User

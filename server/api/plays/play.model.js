'use strict'

const Sequelize = require('sequelize')
var db = require('../../_db')

const Play = db.define('plays', {
  playJson: {
	  type: Sequelize.STRING,
	  allowNull: false
  }
})

module.exports = Play

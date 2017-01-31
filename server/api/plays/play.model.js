'use strict'

const Sequelize = require('sequelize')
var db = require('../../_db')

const Play = db.define('plays', {
  playJson: {
	  type: Sequelize.JSON,
	  allowNull: false
  }
})

module.exports = Play

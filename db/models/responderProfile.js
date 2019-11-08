const Sequelize = require('sequelize')
const db = require('../db')

const ResponderProfile = db.define('responder_profile', {
  responderType: {
    type: Sequelize.STRING
  },
  responderOrg: {
    type: Sequelize.STRING
  },
  dob: {
    type: Sequelize.INTEGER
  },
  weight: {
    type: Sequelize.FLOAT
  },
  height: {
    type: Sequelize.FLOAT
  },
  heartRate: {
    type: Sequelize.INTEGER
  }
})

module.exports = ResponderProfile

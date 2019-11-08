const Sequelize = require('sequelize')
const db = require('../db')

const Alert = db.define('alert', {
  name: {
    type: Sequelize.STRING
  }
})

module.exports = Alert

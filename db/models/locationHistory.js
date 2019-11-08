const Sequelize = require('sequelize')
const db = require('../db')

const LocationHistory = db.define('location_history', {
  lat: {
    type: Sequelize.STRING
  },
  long: {
    type: Sequelize.STRING
  }
})

export default LocationHistory

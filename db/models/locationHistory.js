const Sequelize = require('sequelize')
const db = require('../db')

const LocationHistory = db.define('locationHistory', {
  lat: {
    type: Sequelize.STRING
  },
  long: {
    type: Sequelize.STRING
  }
})

export default LocationHistory

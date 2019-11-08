const Sequelize = require('sequelize')
const db = require('../db')

const SensorData = db.define('sensor_data', {
  timeLogged: {
    type: Sequelize.TIME,
    unique: true,
    allowNull: false
  },
  pressure: {
    type: Sequelize.FLOAT
  },
  humidity: {
    type: Sequelize.FLOAT
  },
  temperature: {
    type: Sequelize.FLOAT
  }
})

module.exports = SensorData

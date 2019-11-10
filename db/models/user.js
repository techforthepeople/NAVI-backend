const Sequelize = require('sequelize')
const db = require('../db')

const User = db.define('user', {
  authId: {
    type: Sequelize.STRING,
    unique:true,
    allowNull:false,
    primaryKey:true,
  },
  email: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  firstName: {
    type: Sequelize.STRING,
    default: 'newUserFirstName'
  },
  lastName: {
    type: Sequelize.STRING,
    default: 'newUserLastName'
  },
  password: {
    type: Sequelize.STRING,
  },
  sensorId: {
    type: Sequelize.STRING,
  },
})

module.exports = User

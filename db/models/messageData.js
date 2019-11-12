const Sequelize = require('sequelize')
const db = require('../db')

const MessageData = db.define('message_data', {
  timestamp: {
    type: Sequelize.DATE,
    unique: true,
    allowNull: false
  },
  subject: {
    type: Sequelize.TEXT
  },
  body: {
    type: Sequelize.TEXT
  },
  priority: {
    type: Sequelize.TEXT
  }

})

module.exports = MessageData
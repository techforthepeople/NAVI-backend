const Sequelize = require('sequelize')
const db = require('../db')

const Group = db.define('group', {
  name: {
    type: Sequelize.STRING
  }
})

export default Group

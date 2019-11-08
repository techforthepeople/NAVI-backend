const Alert = require("./models/alert.js")
const Group = require("./models/groups.js")
const LocationHistory = require("./models/locationHistory.js")
const ResponderProfile = require("./models/responderProfile.js")
const SensorData = require("./models/sensorData.js")
const User = require("./models/user.js")
const db = require('./db')



Group.hasMany(User)
User.belongTo(Group)

User.hasOne(SensorData)
SensorData.belongTo(User)

User.hasOne(ResponderProfile)
ResponderProfile.belongTo(User)

User.hasMany(LocationHistory)
LocationHistory.belongTo(User)

User.hasMany(Alert, {through: 'UserToAlert'})








// register models
require('./models')

module.exports = db

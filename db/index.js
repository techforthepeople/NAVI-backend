const Alert = require("./models/alert.js")
const Group = require("./models/group.js")
const LocationHistory = require("./models/locationHistory.js")
const ResponderProfile = require("./models/responderProfile.js")
const SensorData = require("./models/sensorData.js")
const MessageData = require("./models/messageData.js")
const User = require("./models/user.js")
const db = require('./db')

Group.hasMany(User)
User.belongsTo(Group)

User.hasMany(SensorData)
SensorData.belongsTo(User)

User.hasOne(ResponderProfile)
ResponderProfile.belongsTo(User)

User.hasMany(LocationHistory)
LocationHistory.belongsTo(User)

User.hasMany(MessageData)
MessageData.belongsTo(User)

User.belongsToMany(Alert, {through: 'UserToAlert'})

module.exports = {
    db,
    User,
    Alert,
    Group,
    LocationHistory,
    ResponderProfile,
    SensorData,
    MessageData
}

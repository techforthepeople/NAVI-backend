var express = require('express');
var router = express.Router();
const User = require('../db/models/user')
const ResponderProfile = require('../db/models/responderProfile')
const locationHistory = require('../db/models/locationHistory')


//Get recent location from all users
router.get('/', async (req, res, next) => {
    try {
      const users = await User.findAll({
        include: [{model: locationHistory}]
      });
      res.json(users);
    } catch (err) {
      next(err);
    }
  });
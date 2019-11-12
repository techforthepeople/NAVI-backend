var express = require('express');
var router = express.Router();
const User = require('../db/models/user')
const ResponderProfile = require('../db/models/responderProfile')
const locationHistory = require('../db/models/locationHistory')


//Get recent location from all Users Eager Load on LocationHistory 
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

  //Update the location of a User
  router.post('/:id/', async (req, res, next) => {
      try {
          const newLocation = await locationHistory.create({
              userAuthId: req.params.id,
              lat: req.body.lat,
              long: req.body.long
          });
          res.json(newLocation)
      } catch(err) {
          next(err)
      }
  })

  module.exports = router
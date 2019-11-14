var express = require('express');
var router = express.Router();

const {User} = require('../db/index')
const {LocationHistory} = require('../db/index')
const {ResponderProfile} = require('../db/index')



//Get recent location from all Users Eager Load on LocationHistory 
router.get('/', async (req, res, next) => {
    try {
      const users = await User.findAll({
        include: [{model: locationHistory}, {model: ResponderProfile}]
      });
      res.json(users);
    } catch (err) {
      next(err);
    }
  });

  //Update the location of a User
  router.post('/:id/', async (req, res, next) => {
      try {
          const newLocation = await LocationHistory.create({
              userAuthId: req.params.id,
              lat: req.body.latitude,
              long: req.body.longitude
          });
          res.json(newLocation)
      } catch(err) {
          next(err)
      }
  })

  module.exports = router
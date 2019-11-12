var express = require('express');
var router = express.Router();
const User = require('../db/models/user')
const ResponderProfile = require('../db/models/responderProfile')
const locationHistory = require('../db/models/locationHistory')



router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (err) {
    next(err);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const user = User.create(req.body);
    if (user) {
      res.status(201).send("user created.");
    } else {
      res.status(500).send("User could not be created.")
    }
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      res.status(401).send('User already exists')
    } else {
      next(err)
    }
    next(err)
  }
})

router.get('/:id', function(req, res, next) {
  try {
    const userId = req.params.id;
    const user = User.findByPk(userId);

    if (user) {
      res.sendStatus(201).json(user);
    } else {
      res.sendStatus(404).end();
    }

  } catch (err) {
    next(err);
  }
});

router.put('/:id/updatehealth', async (req, res, next) => {
  try {
    const newUserData = await ResponderProfile.update(
      { heartRate: req.body.heartRate },
      { where: req.params.id }
    )
    if (newUserData) {
      res.sendStatus(201).json(user);
    } else {
      res.sendStatus(404).end();
    }
  } catch (err) {
    next(err)
  }
})

//Add route to update location of user
router.get('/:id/location', async (req, res, next) => {
  try {
    const getUser = await User.findByPk(req.params.id)
    console.log(getUser)
  } catch (err) {
    next(err)
  }
})


module.exports = router;

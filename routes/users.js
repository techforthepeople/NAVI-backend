var express = require('express');
var router = express.Router();
const { User } = require('../db/index')
const { ResponderProfile } = require('../db/index')



router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      include: [{model: ResponderProfile}]
    });
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

router.post('/:id/updatehealth', async (req, res, next) => {
  try {



    const userData = await ResponderProfile.findOrCreate({
      where: {userAuthId: req.params.id},
    })

    console.log(userData)
    await userData[0].update({
      dob: req.body.age, 
      weight: req.body.weight, 
      height: req.body.height,
      heartRate: req.body.heartRate
    })

    if (userData) {
      res.sendStatus(201).json(user);
    } else {
      res.sendStatus(404).end();
    }
  } catch (err) {
    next(err)
  }
})



module.exports = router;

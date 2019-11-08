var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Solidarity' });
});

router.get('/users', function (req, res, next) {
  try {
    const users = User.findAll();
    res.json(users);
  } catch (err) {
    next(err);
  }
});

router.get('/users/:id', function(req, res, next) {
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

router.put('/users/:id/updatehealth', async (req, res, next) => {
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



module.exports = router;

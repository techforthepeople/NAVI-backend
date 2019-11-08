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
    const userID = req.params.id;
    const findUser = User.findByPk(userID);

    if (findUser) {
      res.sendStatus(201).json(findUser);
    } else {
      res.sendStatus(404).end();
    }

  } catch (err) {
    next(err);
  }
});



module.exports = router;

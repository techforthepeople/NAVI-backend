var express = require('express');
var router = express.Router();
var Sensor = require('')

router.post('/', async (req, res, next) => {
    try {
        const newData = await Sensor.create(req.body);
        res.json(newData);
    } catch (err) {
        next(err);
    }
})

module.exports = router;
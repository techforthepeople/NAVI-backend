var express = require('express');
var router = express.Router();
var SensorData = require('../db/models/sensorData')

router.post('/', async (req, res, next) => {
    try {
        const newData = await SensorData.create(req.body);
        res.json(newData);
    } catch (err) {
        next(err);
    }
})

module.exports = router;
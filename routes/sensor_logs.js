var express = require('express');
var router = express.Router();
var {SensorData}= require('../db/index')


router.get('/', async(req, res, next) => {
    try {
        const allSensorData = await SensorData.findAll();
        if (allSensorData) {
            res.json(allSensorData);
        } else {
            res.status(404).send("Sensor data not Found")
        }
    } catch (err) {
        next(err);
    }
})

router.get('/:id', async (req, res, next) => {
    try {
        const sensorData = SensorData.findByPk(req.params.id)
        if (sensorData) {
            res.json(sensorData);
        } else {
            res.status(404).send("Sensor data not Found")
        }
    } catch (err) {
        next(err)
    }
})

router.post('/', async (req, res, next) => {
    try {
        const newData = await SensorData.create(req.body);
        if (newData) {
            res.json(newData);
        } else {
            res.status(500).send("Sensor data post failed")
        }
    } catch (err) {
        next(err);
    }
})

module.exports = router;
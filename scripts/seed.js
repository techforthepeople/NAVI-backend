
const {db} = require('../db')
const { User } = require('../db')

const { LocationHistory } = require('../db/index');
const {SensorData} = require('../db/index')
const {ResponderProfile} = require('../db/index')

const respondersLocation = [
    {
        userAuthId: 'user1',
        lat: 37.68,
        long: -122.45,
    },
    {
        userAuthId: 'user1',
        lat: 37.780002,
        long: -122.450001
    },
    {
        userAuthId: 'user2',
        lat: 37.780002,
        long: -122.450001,
    },
    {
        userAuthId: 'user2',
        lat: 37.68,
        long: -122.45,
    },
]

const responderProfiles = [
    {
        userAuthId: 'user1',
        dob: 27,
        weight: 150,
        height: 107,
        heartRate: 101
    },
    {
        userAuthId: 'user2',
        dob: 27,
        weight: 150,
        height: 107,
        heartRate: 101
    }
]

const sensorLogs = [{
    timeLogged: Date.now() - 15,
    pressure: 80.5,
    humidity: 80,
    temperature: 90,
    userAuthId: 'user1'
},
    {
        timeLogged: Date.now() + 15,
        pressure: 60,
        humidity: 100,
        temperature: 70,
        userAuthId: 'user2'
    }]

async function seed() {
    await db.sync({ force: true })
    console.log('db synced!')

    const users = await Promise.all([
        User.create({ email: 'cody@email.com', authId: 'user1' }),
        User.create({ email: 'murphy@email.com', authId: 'user2' })
    ])

    await Promise.all(
        respondersLocation.map(pin => {
            return LocationHistory.create(pin);
        })
    );

    await Promise.all(
        responderProfiles.map(prof => {
            return ResponderProfile.create(prof);
        })
    );

    await Promise.all(
        sensorLogs.map(sensorLog => {
            return SensorData.create(sensorLog);
        })
    );

    console.log(`seeded ${users.length} users`)
    console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
    console.log('seeding...')
    try {
        await seed()
    } catch (err) {
        console.error(err)
        process.exitCode = 1
    } finally {
        console.log('closing db connection')
        await db.close()
        console.log('db connection closed')
    }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
    runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
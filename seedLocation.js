const db = require('./db');
const {LocationHistory} = require('./db/index');

const respondersLocation = [
    {
    lat: 41.4999275,
    long: -123.1622268,
    }, 
    {
    lat: 40.8370254,
    long: -121.5605029
    },
    {
    lat: 41.2672431,
    long: -122.4252902,
    },
    {
    lat: 41.4101294,
    long: -123.2591138,
    },   
]

const seed = async () => {
  await db.sync({force: true});

  // seed your database here!

  await Promise.all(
    respondersLocation.map(pin => {
      return LocationHistory.create(pin);
    })
  );

  console.log('Seeding success!');

  db.close();
};

seed().catch(err => {
  console.error('Oh noes! Something went wrong!');
  console.error(err);
  db.close();
});

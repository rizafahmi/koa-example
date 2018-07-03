const monk = require('monk');

const MONGO_URL = 'localhost:27017/ninja';

const dbConnect = async (app) => {
  try {
    const db = monk(MONGO_URL);
    app.context.people = db.get('people');
    console.log('Database connection established.');
  } catch (err) {
    console.error(err);
  }
};

module.exports = dbConnect;

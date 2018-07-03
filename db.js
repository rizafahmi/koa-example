const MongoClient = require('mongodb').MongoClient;

const MONGO_URL = 'mongodb://localhost:27017/ninja';

const dbConnect = async (app) => {
  try {
    const client = await MongoClient.connect(
      MONGO_URL,
      { useNewUrlParser: true },
    );
    app.context.people = client.db('ninja').collection('people');
    console.log('Database connection established');
  } catch (err) {
    console.error(err);
  }
};

module.exports = dbConnect;

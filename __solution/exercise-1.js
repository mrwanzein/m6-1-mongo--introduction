'use strict';

const { MongoClient } = require('mongodb');

// create a new client
const client = new MongoClient('mongodb://localhost:27017', {
  useUnifiedTopology: true,
});

const dbFunction = async (dbName, collection, item) => {
  // open the connection to the database server
  await client.connect();
  console.log('connected!');

  const db = client.db(dbName);
  await db.collection(collection).insertOne(item);

  // close the connection to the database server
  client.close();
  console.log('disconnected!');
};

dbFunction('exercises', 'one', { name: 'Buck Rogers' });

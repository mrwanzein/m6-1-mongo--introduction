const { MongoClient } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const addUser = async (dbName, objToInsert) => {
    const client = await MongoClient(MONGO_URI, options);

    await client.connect();
    const db = client.db(dbName);

    await db.collection('users').insertOne(objToInsert);

    client.close();

}

module.exports = { addUser }
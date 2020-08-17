const { MongoClient } = require("mongodb");
const assert = require("assert");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const deleteGreeting = async (req, res) => {
    let { language } = req.params;
    language = language.toLowerCase();
    language = language.split('');
    language.splice(0, 1, language[0].toUpperCase());
    language = language.join('');

    try {
        const client = await MongoClient(MONGO_URI, options);
        await client.connect();

        const db = client.db('exercise_1');
        const r = await db.collection("greetings").deleteOne({ lang: language });
        assert.equal(1, r.deletedCount);
        
        res.status(204).json({ status: 204, language: "deleted" })
        
        client.close();


      } catch (err) {
        console.log(err.stack);
        res.status(500).json({ status: 500, message: err.message });
      }
};

module.exports = { deleteGreeting }
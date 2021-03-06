const { MongoClient } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const getGreeting = async (req, res) => {
    let { language } = req.params;
    language = language.toLowerCase();
    language = language.split('');
    language.splice(0, 1, language[0].toUpperCase());
    language = language.join('');

    try {
        const client = await MongoClient(MONGO_URI, options);
        await client.connect();

        const db = client.db('exercise_1');
        await db.collection("greetings").findOne({ lang: language }, (err, result) => {
        result
            ? res.status(200).json({ status: 200, language, data: result })
            : res.status(404).json({ status: 404, language, data: "Not Found" });
        client.close();
        });

      } catch (err) {
        console.log(err.stack);
        res.status(500).json({ status: 500, message: err.message });
      }
};

module.exports = { getGreeting }
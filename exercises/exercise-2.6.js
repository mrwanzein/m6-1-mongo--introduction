const { MongoClient } = require("mongodb");
const assert = require("assert");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const updateGreeting = async (req, res) => {
    const { _id } = req.params;
    const { hello } = req.body;
    const newValues = { $set: { hello } };

    if(!hello) return res.status(500).json({ status: 500, message: "Please add the hello object" });
    
    try {
        const client = await MongoClient(MONGO_URI, options);
        await client.connect();
        
        const db = client.db('exercise_1');
        const r = await db.collection("greetings").updateOne({ _id }, newValues);
        assert.equal(1, r.matchedCount);
        assert.equal(1, r.modifiedCount);
        
        res.status(200).json({ status: 204, Greeting_Added: hello })
        
        client.close();


      } catch (err) {
        console.log(err.stack);
        res.status(500).json({ status: 500, message: err.message });
      }
};

module.exports = { updateGreeting }
const { MongoClient } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const getGreetingsSection = async (req, res) => {
    let {start, limit} = req.query;
    try {
        const client = await MongoClient(MONGO_URI, options);
        await client.connect();

        const db = client.db('exercise_1');
        const greets = await db.collection("greetings").find().toArray();
        
        if((typeof Number(start) === "number" && (Number(start) || Number(start) === 0)) && (typeof Number(limit) === "number" && (Number(limit) || Number(limit) === 0))) {
            let greetWithQuery = greets.slice(Number(start), (Number(start) + Number(limit)));
            if(greetWithQuery.length) {
                limit = greetWithQuery.length;
                res.status(200).json({ status: 200, start, limit, data: greetWithQuery});
            } else {
                greetWithQuery = greets.slice(0, 15);
                res.status(200).json({ status: 200, Error_In_Query: "Sending back the first 15 items", data: greetWithQuery});
            }
        } else {
            let greetWithQuery = greets.slice(0, 15);
            res.status(200).json({ status: 200, Error_In_Query: "Sending back the first 15 items", data: greetWithQuery});
        }

        client.close();

      } catch (err) {
        console.log(err.stack);
        res.status(500).json({ status: 500, message: err.message });
      }
}

module.exports = { getGreetingsSection }
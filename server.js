"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const { getUsers } = require("./exercises/exercise-1.3");
const { addUser } = require("./exercises/exercise-1.4");
const { createGreeting } = require("./exercises/exercise-2.1");
const { getGreeting } = require("./exercises/exercise-2.3");
const { getGreetingsSection } = require("./exercises/exercise-2.4");
const { deleteGreeting } = require("./exercises/exercise-2.5");
const { updateGreeting } = require("./exercises/exercise-2.6");

const PORT = process.env.PORT || 8000;

express()
  .use(morgan("tiny"))
  .use(express.static("public"))
  .use(bodyParser.json())
  .use(express.urlencoded({ extended: false }))
  .use("/", express.static(__dirname + "/"))

  // exercise 1
  .get('/exercise-1/users', async (req, res) => {
    try {
      const users = await getUsers('exercise_1');
      if(users.length) {
        res.status(200).json({status: 200, users});
      } else {
        res.status(404).json({status: 404, cause: "Data is empty"});
      }
    } catch(err) {
      res.status(404).json({status: 404, err});
    }
  })

  .post('/exercise-1/users', async (req, res) => {
    const user = req.body;
    
    try {
      await addUser('exercise_1', user);
      res.status(201).json({staus: 201, payload: user});
    } catch(err) {
      res.status(400).json({staus: 400, err});
    }
  })

  // exercise 2
  .post('/exercise-2/greeting', createGreeting)
  .get('/exercise-2/greeting/:language', getGreeting)
  .get('/exercise-2/greeting', getGreetingsSection)
  .delete('/exercise-2/greeting/:language', deleteGreeting)
  .put('/exercise-2/greeting/:_id', updateGreeting)

  // handle 404s
  .use((req, res) => res.status(404).type("txt").send("🤷‍♂️"))

  .listen(PORT, () => console.log(`Listening on port ${PORT}`));

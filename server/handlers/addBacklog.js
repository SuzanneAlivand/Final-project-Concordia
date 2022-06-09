const path = require("path");
require("dotenv").config({ path: "./.env" });
const { MongoClient } = require("mongodb");
const { MONGO_URI } = process.env;
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const addBacklog = async (req, res) => {
  const { user, gameId } = req.body;
  const userEmail = user.email;
  try {
    // find the user db,
    const client = new MongoClient(MONGO_URI, options);
    await client.connect();
    const db = client.db("Final-project");
    const result = await db.collection("users").findOne({ email: userEmail });
    // user's collections
    const { backlog, completed, abandoned, inProgress } = result;
    // check to see if the item exist in backlog, if not,add it to backlog
    const ItemExistInBacklog = backlog.find((x) => x === gameId);
    if (!ItemExistInBacklog) {
      backlog.push(gameId);
    }
    // filter other arrays of that item:
    const newCompletedList = completed.filter((x) => x !== gameId);
    const newAbandonedList = abandoned.filter((x) => x !== gameId);
    const newInProgressList = inProgress.filter((x) => x !== gameId);
    const collections = {
      backlog,
      newCompletedList,
      newAbandonedList,
      newInProgressList,
    };
    // then update the collection of the user
    await db.collection("users").findOneAndUpdate(
      { email: userEmail },
      {
        $set: {
          backlog: backlog,
          completed: newCompletedList,
          abandoned: newAbandonedList,
          inProgress: newInProgressList,
        },
      }
    );
    console.log(collections);
    res.status(201).json({ status: 201, data: collections });
    client.close();
  } catch (err) {
    res.status(500).json({ status: 500, message: err.message });
  }
};

module.exports = { addBacklog };

const path = require("path");
require("dotenv").config({ path: "./.env" });
const { MongoClient } = require("mongodb");
const { MONGO_URI } = process.env;
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const getBacklog = async (req, res) => {
  const userEmail = req.headers.email;
  try {
    // find the user db,
    const client = new MongoClient(MONGO_URI, options);
    await client.connect();
    const db = client.db("Final-project");
    const result = await db.collection("users").findOne({ email: userEmail });
    // user's collections
    const { backlog, completed, abandoned, inProgress } = result;

    res.status(201).json({ status: 200, data: backlog });
    client.close();
  } catch (err) {
    res.status(500).json({ status: 500, message: err.message });
  }
};

module.exports = { getBacklog };

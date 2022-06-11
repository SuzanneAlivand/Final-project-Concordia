require("dotenv").config();
const { MongoClient } = require("mongodb");
const { MONGO_URI } = process.env;
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const getAbandoned = async (req, res) => {
  const userEmail = req.headers.email;
  try {
    // find the user db,
    const client = new MongoClient(MONGO_URI, options);
    await client.connect();
    const db = client.db("Final-project");
    const result = await db.collection("users").findOne({ email: userEmail });
    // user's collections
    const { abandoned } = result;

    res.status(201).json({ status: 200, data: abandoned });
    client.close();
  } catch (err) {
    res.status(500).json({ status: 500, message: err.message });
  }
};

module.exports = { getAbandoned };

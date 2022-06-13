require("dotenv").config();
const { MongoClient } = require("mongodb");
const { MONGO_URI } = process.env;
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const deleteFromInProgress = async (req, res) => {
  const userEmail = req.headers.email;
  const id = req.params.id;
  try {
    // find the user db,
    const client = new MongoClient(MONGO_URI, options);
    await client.connect();
    const db = client.db("Final-project");
    const result = await db.collection("users").findOne({ email: userEmail });
    // user's collections
    const { inProgress } = result;
    newInProgress = inProgress.filter((x) => x !== Number(id));
    await db
      .collection("users")
      .findOneAndUpdate(
        { email: userEmail },
        { $set: { inProgress: newInProgress } }
      );
    return res.status(200).json({ status: 200, data: newInProgress });
    client.close();
  } catch (err) {
    return res.status(500).json({ status: 500, message: err.message });
  }
};

module.exports = { deleteFromInProgress };

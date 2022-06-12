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
    console.log(result);
    // user's collections
    const { inProgress } = result;
    newInProgress = inProgress.filter((x) => x !== Number(id));
    await db
      .collection("users")
      .findOneAndUpdate(
        { email: userEmail },
        { $set: { inProgress: newInProgress } }
      );
    res.status(204).json({ status: 204, data: newInProgress });
    client.close();
  } catch (err) {
    res.status(500).json({ status: 500, message: err.message });
  }
};

module.exports = { deleteFromInProgress };

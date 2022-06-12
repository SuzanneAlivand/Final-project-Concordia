require("dotenv").config();
const { MongoClient } = require("mongodb");
const { MONGO_URI } = process.env;
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const deleteFromBacklog = async (req, res) => {
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
    const { backlog } = result;
    newBacklog = backlog.filter((x) => x !== Number(id));
    await db
      .collection("users")
      .findOneAndUpdate(
        { email: userEmail },
        { $set: { backlog: newBacklog } }
      );
    res.status(204).json({ status: 204, data: newBacklog });
    client.close();
  } catch (err) {
    res.status(500).json({ status: 500, message: err.message });
  }
};

module.exports = { deleteFromBacklog };

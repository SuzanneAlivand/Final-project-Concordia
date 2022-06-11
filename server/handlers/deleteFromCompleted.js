require("dotenv").config();
const { MongoClient } = require("mongodb");
const { MONGO_URI } = process.env;
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const deleteFromCompleted = async (req, res) => {
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
    const { completed } = result;
    newCompleted = completed.filter((x) => x !== Number(id));
    await db
      .collection("users")
      .findOneAndUpdate(
        { email: userEmail },
        { $set: { completed: newCompleted } }
      );
    res.status(201).json({ status: 200, data: newCompleted });
    client.close();
  } catch (err) {
    res.status(500).json({ status: 500, message: err.message });
  }
};

module.exports = { deleteFromCompleted };

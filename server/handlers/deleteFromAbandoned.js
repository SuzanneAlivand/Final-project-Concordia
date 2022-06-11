require("dotenv").config();
const { MongoClient } = require("mongodb");
const { MONGO_URI } = process.env;
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const deleteFromAbandoned = async (req, res) => {
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
    const { abandoned } = result;
    newAbandoned = abandoned.filter((x) => x !== Number(id));
    await db
      .collection("users")
      .findOneAndUpdate(
        { email: userEmail },
        { $set: { abandoned: newAbandoned } }
      );
    res.status(201).json({ status: 200, data: newAbandoned });
    client.close();
  } catch (err) {
    res.status(500).json({ status: 500, message: err.message });
  }
};

module.exports = { deleteFromAbandoned };

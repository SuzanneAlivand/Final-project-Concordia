require("dotenv").config();
const { v4: uuidv4 } = require("uuid");
const { MongoClient } = require("mongodb");
const { MONGO_URI } = process.env;
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const addUser = async (req, res) => {
  const { user } = req.body;
  const userEmail = user.email;
  const logIn = Date();
  try {
    // check if the user already exist or not
    const client = new MongoClient(MONGO_URI, options);
    await client.connect();
    const db = client.db("Final-project");
    const result = await db.collection("users").findOne({ email: userEmail });
    if (result) {
      await db
        .collection("users")
        .findOneAndUpdate({ email: userEmail }, { $set: { lastLogIn: logIn } });
      return res
        .status(200)
        .json({ status: 200, message: "This user already exist!" });
    } else {
      const NewUser = Object.assign(
        { _id: uuidv4() },
        { lastLogIn: Date() },
        {joined: Date()},
        user,
        { backlog: [] },
        { completed: [] },
        { abandoned: [] },
        { inProgress: [] }
      );
      await db.collection("users").insertOne(NewUser);
      return res.status(201).json({ status: 201, message: "New user added!" });
      client.close();
    }
  } catch (err) {
    return res.status(500).json({ status: 500, message: err.message });
  }
};

module.exports = { addUser };

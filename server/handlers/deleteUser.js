require("dotenv").config();
const { MongoClient } = require("mongodb");
const { MONGO_URI } = process.env;
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const deleteUser = async (req, res) => {
  const userEmail = req.headers.email;
  try {
    // find the user db,
    const client = new MongoClient(MONGO_URI, options);
    await client.connect();
    const db = client.db("Final-project");
    const result = await db
      .collection("users")
      .findOneAndDelete({ email: userEmail });
    return res
      .status(204)
      .json({ status: 204, message: "user has been deleted!" });
  } catch (err) {
    res.status(500).json({ status: 500, message: err.message });
  }
};

module.exports = { deleteUser };

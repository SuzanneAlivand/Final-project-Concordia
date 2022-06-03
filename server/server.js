const express = require("express");
const morgan = require("morgan");

const path = require("path");
require("dotenv").config({ path: "./.env" });

const port = process.env.PORT || 5000;
const { getPopularGames } = require("./handlers");
const res = require("express/lib/response");

const app = express();
app.use(morgan("tiny")); // ??
app.use(express.static("public")); // ??
app.use(express.json()); //?

app.get("/top250games", async (req, res) => {
  const data = await getPopularGames(req.query.page);
  res.status(200).json({
    status: 200,
    data: data,
  });
});

app.get("/", (req, res) => {
  res.send("Hi");
});

app.listen(port, console.log(`server running on port ${port}..`));

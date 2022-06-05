const express = require("express");
const morgan = require("morgan");

const path = require("path");
require("dotenv").config({ path: "./.env" });

const port = process.env.PORT || 5000;
const { getPopularGames } = require("./handlers/top250Games");
const { bestGameYear } = require("./handlers/bestGameYear");
const { popularOfYear } = require("./handlers/popularOfYear");

const app = express();
app.use(morgan("tiny")); // ??
app.use(express.static("public")); // ??
app.use(express.json()); //?

//..............................
// getting random 20 top games
app.get("/api/20topgames/:page", async (req, res) => {
  const data = await getPopularGames(req.params.page);
  res.status(200).json({
    status: 200,
    data: data,
  });
});
//..............................
// getting all time top 250 games
app.get("/api/top250games", async (req, res) => {
  const data = await getPopularGames(req.query.page || 1);
  res.status(200).json({
    status: 200,
    data: data,
  });
});

//..............................
// get best of the year games
app.get("/api/best-of-the-year", bestGameYear);

//..............................
// get popular games of 2021
app.get("/api/popular2021", popularOfYear);

app.get("/", (req, res) => {
  res.send("Hi");
});

app.listen(port, console.log(`server running on port ${port}..`));

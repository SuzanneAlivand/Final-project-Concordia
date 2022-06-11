const express = require("express");
const morgan = require("morgan");

const path = require("path");
require("dotenv").config({ path: "./.env" });

const port = process.env.PORT || 5000;
const { getPopularGames } = require("./handlers/top250Games");
const { bestGameYear } = require("./handlers/bestGameYear");
const { popularOfYear } = require("./handlers/popularOfYear");
const { allGames } = require("./handlers/allGames");
const { search } = require("./handlers/search");
const { addUser } = require("./handlers/addUser");
const { addBacklog } = require("./handlers/addBacklog");
const { addCompleted } = require("./handlers/addCompleted");
const { addAbandoned } = require("./handlers/addAbandoned");
const { addInProgress } = require("./handlers/addInProgress");
const { getGameById } = require("./handlers/getGameById");
const { getBacklog } = require("./handlers/getBacklog");
const { getUser } = require("./handlers/getUser");
const {deleteFromBacklog} = require("./handlers/deleteFromBacklog")

const app = express();
app.use(morgan("tiny")); // ??
app.use(express.static("public")); // ??
app.use(express.json()); //?

//..............................
// get all games
app.get("/api/games", allGames);

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

//..............................
// search games
app.get("/api/search", search);

//..............................
// add user to db
app.post("/api/new-user", addUser);

//..............................
// get user from db
app.get("/api/user", getUser);

//..............................
// add a game to backlog list
app.post("/api/add-backlog", addBacklog);

//..............................
// add a game to completed list
app.post("/api/add-completed", addCompleted);

//..............................
// add a game to in progress list
app.post("/api/add-inProgress", addInProgress);

//..............................
// add a game to abandoned list
app.post("/api/add-abandoned", addAbandoned);

//..............................
// get a game by its id
app.get("/api/game", getGameById);

//..............................
// get backlog list of a specific user
app.get("/api/backlog", getBacklog);

//..............................
// delete a game from backlog list of a specific user
app.delete("/api/backlog-remove/:id",deleteFromBacklog)

app.get("/", (req, res) => {
  res.send("Hi");
});

app.listen(port, console.log(`server running on port ${port}..`));

const express = require("express");
const morgan = require("morgan");
require("dotenv").config();

const port = process.env.PORT || 5000;
const { getPopularGames } = require("./handlers/top250Games");
const { bestGameYear } = require("./handlers/bestGameYear");
const { popularOfYear } = require("./handlers/popularOfYear");
const { getPopularGamesRandom } = require("./handlers/getPopularGamesRandom");
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
const { deleteFromBacklog } = require("./handlers/deleteFromBacklog");
const { getCompleted } = require("./handlers/getCompleted");
const { deleteFromCompleted } = require("./handlers/deleteFromCompleted");
const { deleteFromInProgress } = require("./handlers/deleteFromInProgress");
const { getInProgress } = require("./handlers/getInProgress");
const { getAbandoned } = require("./handlers/getAbandoned");
const { deleteFromAbandoned } = require("./handlers/deleteFromAbandoned");
const { getActionGames } = require("./handlers/genres/getActionGames");
const { getStrategyGames } = require("./handlers/genres/getStrategyGames");
const { getRpgGames } = require("./handlers/genres/getRpgGames");
const { getShooterGames } = require("./handlers/genres/getShooterGames");
const { getAdventureGames } = require("./handlers/genres/getAdventureGames");
const { getRacingGames } = require("./handlers/genres/getRacingGames");
const { getSportsGames } = require("./handlers/genres/getSportsGames");
const {getPuzzleGames}=require("./handlers/genres/getPuzzleGames")

const app = express();
app.use(morgan("tiny"));
app.use(express.static("public"));
app.use(express.json());

//..............................
// get all games
app.get("/api/games", allGames);

//..............................
// getting random 20 top games
app.get("/api/20topgames/:page", getPopularGamesRandom);

//..............................
// getting all time top 250 games
app.get("/api/top250games", getPopularGames);

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
// get completed list of a specific user
app.get("/api/completed", getCompleted);

//..............................
// get in progress list of a specific user
app.get("/api/inProgress", getInProgress);

//..............................
// get abandoned list of a specific user
app.get("/api/abandoned", getAbandoned);

//..............................
// delete a game from backlog list of a specific user
app.delete("/api/backlog-remove/:id", deleteFromBacklog);

//..............................
// delete a game from completed list of a specific user
app.delete("/api/completed-remove/:id", deleteFromCompleted);

//..............................
// delete a game from in progress list of a specific user
app.delete("/api/inProgress-remove/:id", deleteFromInProgress);

//..............................
// delete a game from abandoned list of a specific user
app.delete("/api/abandoned-remove/:id", deleteFromAbandoned);

//..............................
// get all the action games
app.get("/api/action", getActionGames);

//..............................
// get all the strategy games
app.get("/api/strategy", getStrategyGames);

//..............................
// get all the RPG games
app.get("/api/rpg", getRpgGames);

//..............................
// get all the shooter games
app.get("/api/shooter", getShooterGames);

//..............................
// get all the adventure games
app.get("/api/advanture", getAdventureGames);

//..............................
// get all the racing games
app.get("/api/racing", getRacingGames);

//..............................
// get all the sports games
app.get("/api/sports", getSportsGames);

//..............................
// get all the puzzle games
app.get("/api/puzzle", getPuzzleGames);

app.get("/", (req, res) => {
  res.send("this is the root");
});

app.listen(port, console.log(`server running on port ${port}..`));

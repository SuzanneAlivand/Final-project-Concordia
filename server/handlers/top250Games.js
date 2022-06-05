const request = require("request-promise");
const path = require("path");
require("dotenv").config({ path: "./.env" });
const { RapidAPI_Key } = process.env;

const getPopularGames = async (page) => {
  const options = {
    method: "GET",
    uri: `https://rawg.io/api/games/lists/popular?discover=true&&page_size=20&page=${page}&key=${RapidAPI_Key}`,
    headers: {
      // "X-RapidAPI-Host": "rawg-video-games-database.p.rapidapi.com",
      // "X-RapidAPI-Key": "0cb98f07b65f447ea920c0bff0444b32",
      useQueryString: true,
    },
  };
  try {
    const response = await request(options);
    const data = await JSON.parse(response);
    return data;
  } catch (err) {
    console.log(err);
  }
};

module.exports = { getPopularGames };

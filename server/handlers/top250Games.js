const request = require("request-promise");
const path = require("path");
require("dotenv").config({ path: "./.env" });
const { RapidAPI_Key } = process.env;

const getPopularGames = async (page) => {
  const options = {
    method: "GET",
    uri: `https://rawg.io/api/games/lists/popular?discover=true&&page_size=20&page=${page}&key=${RapidAPI_Key}`,
    headers: {
      useQueryString: true,
    },
  };
  try {
    const response = await request(options);
    const data = await JSON.parse(response);
    return data;
  } catch (err) {
    console.log(err);
    return err;
  }
};

module.exports = { getPopularGames };

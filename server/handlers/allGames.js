//

const request = require("request-promise");
const path = require("path");
require("dotenv").config({ path: "./.env" });
const { RapidAPI_Key } = process.env;

const allGames = async (req, res) => {
  page = req.query.page || 1;
  const options = {
    method: "GET",
    uri: `https://rawg.io/api/games?page=${page}&page_size=20&filter=true&comments=true&key=${RapidAPI_Key}`,
    headers: {
      useQueryString: true,
    },
  };
  try {
    const response = await request(options);
    const data = await JSON.parse(response);
    return res.status(200).json({
      status: 200,
      data: data,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      status: 500,
      err,
    });
  }
};
module.exports = { allGames };
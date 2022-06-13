const request = require("request-promise");
require("dotenv").config();
const { RapidAPI_Key } = process.env;

const getActionGames = async (req, res) => {
  page = req.query.page || 1;
  const options = {
    method: "GET",
    uri: `https://rawg.io/api/games?genres=4&page=${page}&page_size=20&filter=true&comments=true&key=${RapidAPI_Key}`,
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
    return res.status(500).json({
      status: 500,
      err,
    });
  }
};
module.exports = { getActionGames };

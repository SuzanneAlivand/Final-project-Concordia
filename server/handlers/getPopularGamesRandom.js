const request = require("request-promise");
require("dotenv").config();
const { RapidAPI_Key } = process.env;

const getPopularGamesRandom = async (req, res) => {
  const page = req.params.page || 1;
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

module.exports = { getPopularGamesRandom };

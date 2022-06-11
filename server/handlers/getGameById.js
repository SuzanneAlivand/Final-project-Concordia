const request = require("request-promise");
require("dotenv").config();
const { RapidAPI_Key } = process.env;

const getGameById = async (req, res) => {
  id = req.query.id;
  const options = {
    method: "GET",
    uri: `https://rawg.io/api/games/${id}?key=${RapidAPI_Key}`,
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
module.exports = { getGameById };

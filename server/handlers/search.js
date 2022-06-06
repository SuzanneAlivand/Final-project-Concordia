const request = require("request-promise");
const path = require("path");
require("dotenv").config({ path: "./.env" });
const { RapidAPI_Key } = process.env;

const search = async (req, res) => {
  page = req.query.page || 1;
  slug = req.query.slug;
  const options = {
    method: "GET",
    uri: `https://rawg.io/api/games?page_size=20&page=${page}&key=${RapidAPI_Key}&search=${slug}`,
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

module.exports = { search };

const axios = require("axios");
require("dotenv").config();

const yelp_axios = axios.create({
    baseURL: "https://api.yelp.com/v3/businesses",
    headers: {
        Authorization: `Bearer ${process.env.YELP_KEY}`,
    },
});

module.exports = yelp_axios;

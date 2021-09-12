const express = require("express");
const yelp_axios = require("../api/yelp");

const router = express.Router();

router.get("/search", async (req, res) => {
    try {
        const yelp_req = await yelp_axios.get("/search", {
            params: {
                term: req.query.term,
                limit: 50,
                price: [1, 2, 3, 4],
                location: req.query.location,
                categories: "restaurants",
            },
        });

        res.send(yelp_req.data.businesses);
    } catch (err) {
        console.log(err.message);
        res.status(422).send({ error: err.message });
    }
});

router.get("/details/:id", async (req, res) => {
    const id = req.params.id;

    try {
        const result = await yelp_axios.get(`/${id}`);
        res.send(result.data);
    } catch (err) {
        console.log(err.message);
        res.status(422).send({ error: err.message });
    }
});

module.exports = router;

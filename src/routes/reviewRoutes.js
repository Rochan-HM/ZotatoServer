const express = require("express");
const mongoose = require("mongoose");
const requireAuth = require("../middlewares/requireAuth");
const yelp_axios = require("../api/yelp");

const Review = mongoose.model("Review");

const router = express.Router();

router.get("/reviews/:id", async (req, res) => {
    try {
        const id = req.params.id;

        const yelp_req = await yelp_axios.get(`/${id}/reviews`);
        const yelp_reviews = yelp_req.data;

        const local_reviews = await Review.find({ businessID: id });

        const all_reviews = [];
        let index = 0;

        for (const review of yelp_reviews.reviews) {
            all_reviews.push({
                id: index++,
                source: "yelp",
                text: review.text,
            });
        }

        for (const review of local_reviews) {
            all_reviews.push({
                id: index++,
                source: "zotato",
                text: review.review,
            });
        }

        res.send(all_reviews);
    } catch (e) {
        console.log(e);
        res.status(400).send("Invalid request");
    }
});

router.post("/reviews/", requireAuth, async (req, res) => {
    const { businessID, review } = req.body;

    if (!businessID || !review) {
        return res
            .status(422)
            .send({ error: "You must provide a businessID and review" });
    }

    try {
        const new_review = new Review({
            businessID,
            review,
            userId: req.user._id,
        });
        await new_review.save();
        res.send(new_review);
    } catch (err) {
        console.error(err);
        res.status(422).send({ error: err.message });
    }
});

module.exports = router;

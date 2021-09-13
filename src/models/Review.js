const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    businessID: {
        type: String,
        required: true,
    },
    review: {
        type: String,
    },
});

mongoose.model("Review", reviewSchema);

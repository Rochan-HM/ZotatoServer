require("./models/User");
require("./models/Track");
require("./models/Review");
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/authRoutes");
const trackRoutes = require("./routes/trackRoutes");
const reviewRoutes = require("./routes/reviewRoutes");
const businessRoutes = require("./routes/businessRoutes");
const requireAuth = require("./middlewares/requireAuth");

const app = express();

app.use(bodyParser.json());

const mongoUri = process.env.MONGO_URI;

if (!mongoUri) {
    throw new Error(
        `MongoURI was not supplied.  Make sure you watch the video on setting up Mongo DB!`
    );
}
mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
});
mongoose.connection.on("connected", () => {
    console.log("Connected to mongo instance");
});
mongoose.connection.on("error", (err) => {
    console.error("Error connecting to mongo", err);
});

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.get("/me", requireAuth, (req, res) => {
    res.send(`Your email: ${req.user.email}`);
});

app.use(businessRoutes);
app.use(authRoutes);
app.use(reviewRoutes);
app.use(trackRoutes);

app.listen($process.env.PORT || 3000, () => {
    console.log("Server running on port 3000");
});

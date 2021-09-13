require("./models/User");
require("./models/Review");
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoutes");
const reviewRoutes = require("./routes/reviewRoutes");
const businessRoutes = require("./routes/businessRoutes");
const requireAuth = require("./middlewares/requireAuth");

const app = express();

app.use(express.json());

const mongoUri = process.env.MONGO_URI;

if (!mongoUri) {
    throw new Error(`MongoURI not present.`);
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

app.listen(process.env.PORT || 3000, () => {
    console.log(`Server running on port ${process.env.PORT || 3000}`);
});

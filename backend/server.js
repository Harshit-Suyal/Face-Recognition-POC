require("dotenv").config();

const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");

const registerRoute = require("./routes/register");
const searchRoute = require("./routes/search");

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.use("/api/register", registerRoute);
app.use("/api/search", searchRoute);

app.listen(5000, () => {
    console.log("Server Running");
});
const express = require("express");
const cors = require("cors");
const path = require("path");

const connectDB = require("./config/db");

const registerRoutes = require("./routes/register.routes");
const searchRoutes = require("./routes/search.routes");
const pageRoutes = require("./routes/page.routes");

const app = express();

// Connect to MongoDB before serving requests
connectDB();

// Enable cross-origin requests
app.use(cors());

// Parse incoming JSON payloads
app.use(express.json());

// Parse form submissions
app.use(express.urlencoded({ extended: true }));

// Configure EJS
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Serve CSS, JS and images
app.use(express.static(path.join(__dirname, "public")));

// API routes
app.use("/api/register", registerRoutes);
app.use("/api/search", searchRoutes);
app.use("/", pageRoutes);

module.exports = app;
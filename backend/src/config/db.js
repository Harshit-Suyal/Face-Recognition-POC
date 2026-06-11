const mongoose = require("mongoose");

/**
 * Establish a connection with MongoDB.
 *
 * This function is executed when the application starts.
 * If the database connection fails, the application exits
 * because most features depend on database access.
 */
const connectDB = async () => {
    try {
        // Connect to MongoDB using the connection string
        // stored inside the environment variables.
        await mongoose.connect(process.env.MONGO_URI);

        console.log("MongoDB Connected Successfully");
    } catch (error) {
        // Log the actual database connection error
        console.error("MongoDB Connection Failed:", error.message);

        // Stop the application if database connection fails
        process.exit(1);
    }
};

module.exports = connectDB;
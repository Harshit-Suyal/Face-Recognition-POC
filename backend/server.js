require("dotenv").config();

const app = require("./src/app");

const PORT = process.env.PORT || 5000;

// Start Express server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
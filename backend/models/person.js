const mongoose = require("mongoose");

const PersonSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    embedding: {
        type: [Number],
        required: true
    },

    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Person", PersonSchema);
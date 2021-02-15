const mongoose = require("mongoose");

const genreSchema = mongoose.Schema({
    naziv: { type: String, required: true },
});

module.exports = mongoose.model("Genre", genreSchema);
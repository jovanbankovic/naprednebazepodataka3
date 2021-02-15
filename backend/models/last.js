const mongoose = require("mongoose");

const lastSchema = mongoose.Schema({
    korime: { type: String, required: true },
    datum: { type: Date, required: true },
});

module.exports = mongoose.model("Last", lastSchema);
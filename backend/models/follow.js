const mongoose = require("mongoose");

const followSchema = mongoose.Schema({
    pratilac: { type: String, required: true },
    praceni: { type: String, required: true }
});

module.exports = mongoose.model("Follow", followSchema);
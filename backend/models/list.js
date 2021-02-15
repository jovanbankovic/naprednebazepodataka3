const mongoose = require("mongoose");

const listSchema = mongoose.Schema({
    naziv: { type: String, required: true },
    autori: [{ type: String }],
    korime: { type: String, required: true },
    status: { type: String, required: true },
    strana: { type: Number, required: true },
    procitano: { type: Number, required: true },

});

module.exports = mongoose.model("List", listSchema);
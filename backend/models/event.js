const mongoose = require("mongoose");

const eventSchema = mongoose.Schema({
    naziv: { type: String, required: true }, 
    pocetak: { type: Date, required: true },
    kraj: { type: Date},
    opis: { type: String, required: true},
    kreator: {type: String, required: true},
    tip: {type: String, required: true},
    status: {type: String, required: true},
    zahtevi: [{ type: String }],
    ucesnici: [{ type: String }],
    autori: [{ type: String }],
    poruke: [{ type: String }]
});

module.exports = mongoose.model("Event", eventSchema);
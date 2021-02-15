const mongoose = require("mongoose");

const bookSchema = mongoose.Schema({
    slikaPutanja: { type: String, required: true },
    naziv: { type: String, required: true },
    autori: [{ type: String }], //mozda treba required
    datum: { type: Date, required: true },
    zanrovi: [{ type: String }], //max 3 zanra
    opis: { type: String, required: true },
    prosek: { type: Number, required: true },
    zahtev: { type: Boolean, required: true },
    odobrena: { type: Boolean, required: true }

});

module.exports = mongoose.model("Book", bookSchema);
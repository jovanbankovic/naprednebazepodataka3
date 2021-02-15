const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const userSchema = mongoose.Schema({
  ime: { type: String, required: true },
  prezime: { type: String, required: true },
  slikaPutanja: { type: String, required: true },
  korime: { type: String, required: true, unique: true },
  lozinka: { type: String, required: true },
  datum: { type: Date, required: true },
  grad: { type: String, required: true },
  drzava: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  privilegije: { type: Boolean, required: true },
  zahtev: { type: Boolean, required: true},
  prihvacen: { type: Boolean, required: true },
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User", userSchema);
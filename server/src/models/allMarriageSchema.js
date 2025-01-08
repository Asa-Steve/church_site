const mongoose = require("mongoose");

const marriageSChema = new mongoose.Schema({
  husbandName: { type: String, required: true },
  wifeName: { type: String, required: true },
  lm: { type: Number, required: true, unique: true },
  doMarriage: { type: Date, required: true },
  placeofMarriage: { type: String, require: true },
  witness1: { type: String, require: true },
  witness2: { type: String, require: true },
  officiatingPriest: { type: String, require: true },
  createdAt: {
    type: Date,
    default: Date.now, // Automatically set when the record is created
  },
  updatedAt: {
    type: Date,
    default: Date.now, // Automatically set when the record is updated
  },
});

// Middleware to update the `updatedAt` field automatically
marriageSChema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model("marriageRecord", marriageSChema);

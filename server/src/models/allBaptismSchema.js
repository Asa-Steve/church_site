const mongoose = require("mongoose");

const baptismSchema = new mongoose.Schema({
  baptismName: { type: String, required: true }, // The baptismal name
  otherName: { type: String, required: false }, // Additional name(s)
  surname: { type: String, required: true }, // The surname
  dob: { type: Date, required: true }, // The  date of birth
  doBaptism: { type: Date, required: true }, // The date of baptism
  birthPlace: { type: String, required: true }, // The place where the person was born
  placeofBaptism: {
    type: String,
    required: true,
    default: "St. Matthias Catholic Church Amarata, Yenagoa Bayelsa state.",
  },
  fatherName: { type: String, required: true }, // Father's name
  motherName: { type: String, required: true }, // Mother's name
  homeTown: { type: String, required: true }, // Family's hometown
  lga: { type: String, required: true }, // Local Government Area
  state: { type: String, required: true }, // State of origin
  lb: { type: Number, require: true, unique: true },
  sponsor: { type: String, required: true }, // Name of the sponsor for baptism
  minister: { type: String, required: true },
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
baptismSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model("BaptismRecord", baptismSchema);

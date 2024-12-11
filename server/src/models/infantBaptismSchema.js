const mongoose = require("mongoose");

const infantBaptismSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true, // Identifies the user submitting the form
    match: /^\S+@\S+\.\S+$/, // Basic email validation
  },
  infant: {
    baptismName: { type: String, required: true }, // The child's baptismal name
    otherName: { type: String, required: false }, // Additional name(s)
    surname: { type: String, required: true }, // The child's surname
    dob: { type: Date, required: true }, // The child's date of birth
    birthPlace: { type: String, required: true }, // The place where the child was born
  },
  parents: {
    fatherName: { type: String, required: true }, // Father's name
    motherName: { type: String, required: true }, // Mother's name
    contact: { type: String, required: true, match: /^[0-9]{10,15}$/ }, // Parent's phone number with validation
    residenceAddr: { type: String, required: true }, // Current residence address
    homeTown: { type: String, required: true }, // Family's hometown
    lga: { type: String, required: true }, // Local Government Area
    state: { type: String, required: true }, // State of origin
    wedded: { type: String, enum: ["YES", "NO"], required: true }, // Whether parents are wedded
  },
  sponsor: { type: String, required: true }, // Name of the baptism sponsor
  payment: {
    amount: { type: Number, required: true, default: 1000, min: 0 }, // Payment amount with a default value
    paymentFor: { type: String, enum: ["infant_baptism"], required: true }, // Purpose of payment
  },
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
infantBaptismSchema.pre("save", function (next) {
  if (this.email) {
    this.email = this.email.toLowerCase();
  }
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model("InfantBaptism", infantBaptismSchema);

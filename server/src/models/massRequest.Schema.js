const mongoose = require("mongoose");

const massRequestSchema = new mongoose.Schema({
  //   userId: {
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: "User", // References the Users collection
  //     required: true,
  //   },
  email: { type: String, required: true },
  fullName: {
    type: String,
    required: true,
  },
  novena: {
    type: Number,
    required: true,
    default: 1,
  },
  intentions: {
    type: String,
    required: true,
  },
  requestedFor: {
    type: String,
    required: true,
  },
  note: {
    type: String,
  },
  amount: {
    type: Number, // Optional monetary offering for the mass
    required: true,
    default: 0,
  },
  transactionId: {
    type: String, // Transaction ID from payment gateway
    required: true,
    unique: true, // Ensure no duplicate transactions
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Middleware to update the `updatedAt` field automatically
massRequestSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model("MassRequest", massRequestSchema);

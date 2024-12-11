const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
    min: 0, // Ensure the amount is not negative
  },
  purpose: {
    type: String,
    enum: ["donation", "mass_request", "infant_baptism"], // Payment purpose
    required: true,
  },
  referenceId: {
    type: mongoose.Schema.Types.ObjectId, // Links to the related collection (optional for donations)
    required: function () {
      return this.purpose !== "donation"; // Ensures referenceId is present for non-donation payments
    },
  },
  transactionId: {
    type: String, // Transaction ID from payment gateway
    required: true,
    unique: true, // Ensure no duplicate transactions
  },
  method: {
    type: String,
    // enum: ["card", "bank_transfer", "cash", "mobile_money"], // Payment methods
    required: true,
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
paymentSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model("Payment", paymentSchema);

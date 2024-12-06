const mongoose = require("mongoose");
// const connectDB = require("../database/db");
// connectDB();

// Define the schema
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
});

// Create the model
module.exports = mongoose.model("User", userSchema);

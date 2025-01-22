const mongoose = require("mongoose");
// Defining the schema
const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      required: true,
      enum: ["superAdmin", "editor","secretary"],
      default: "Editor",
    },
    img: { type: String },
  },
  { timestamps: true }
);

// Creating the model
module.exports = mongoose.model("User", userSchema);

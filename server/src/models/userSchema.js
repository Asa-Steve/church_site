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
      enum: ["superAdmin", "editor", "secretary", "catechist"],
      default: "Editor",
    },
    img: { type: String },
    resetPwToken: { type: String },
    resetPwExpire: { type: Date },
  },
  { timestamps: true }
);

// Creating the model
module.exports = mongoose.model("User", userSchema);

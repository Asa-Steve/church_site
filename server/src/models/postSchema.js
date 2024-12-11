const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  //   author: {
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: "Admin",
  //     required: true,
  //   },
  author: { type: String, required: true, default: "Admin" },
  postTitle: { type: String, required: true, trim: true },
  content: { type: String, required: true },
  category: {
    type: String,
    required: true,
    enum: ["Feast", "Event", "Announcement", "Others", "Uncategorised"],
    default: "Uncategorised",
    file: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
});

module.exports = mongoose.model("Post", postSchema);

const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  postTitle: { type: String, required: true, trim: true },
  content: { type: String, required: true },
  category: {
    type: String,
    required: true,
    enum: [
      "Feast",
      "Event",
      "Announcement",
      "Others",
      "Upcoming",
      "Uncategorised",
    ],
    default: "Uncategorised",
  },
  slug: {
    type: String,
    unique:true
  },
  file: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

postSchema.pre("save", function (next) {
  if (!this.sulg && this.postTitle) {
    this.slug = this.postTitle.split(" ").join("+").toLowerCase();
    next();
  }
});
module.exports = mongoose.model("Post", postSchema);

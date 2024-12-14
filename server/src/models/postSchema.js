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
    unique: true,
  },
  file: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

postSchema.pre("save", function (next) {
  if (!this.slug && this.postTitle) {
    this.slug = this.postTitle.split(" ").join("+").toLowerCase();
    next();
  }
});

postSchema.pre("findOneAndUpdate", function (next) {
  const update = this.getUpdate();

  if (update.postTitle) {
    // Generate the slug dynamically
    update.slug = update.postTitle.split(" ").join("+").toLowerCase();
    this.setUpdate(update);
  }

  next();
});

module.exports = mongoose.model("Post", postSchema);

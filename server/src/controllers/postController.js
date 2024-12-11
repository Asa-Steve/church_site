const Post = require("../models/postSchema");

const createPost = (req, res) => {
  const { postTitle, content, category } = req.body;
  const file = req.file.filename;

  if (postTitle && content && category && file) {
    const newPost = new Post({ postTitle, content, category, file });
    console.log(newPost);
  }
};

module.exports = { createPost };

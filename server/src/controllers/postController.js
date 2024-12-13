const Post = require("../models/postSchema");

const createPost = async (req, res) => {
  const { postTitle, content, category } = req.body;
  const file = req?.file?.path;

  if (postTitle && content && category && file) {
    try {
      const newPost = new Post({
        postTitle,
        content,
        category,
        file,
        author: req?.user?.id,
      });

      await newPost.save();
      return res
        .status(200)
        .json({ status: "success", message: "Post Created Successfully..." });
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        status: "failure",
        message: err?.message || "Couldn't Create Post...",
      });
    }
  }
};

const allPosts = async (req, res) => {
  try {
    const allPosts = await Post.find()
      .populate("author", "username role")
      .exec();
    return res.status(200).json({ status: "success", data: allPosts });
  } catch (err) {
    return res
      .status(500)
      .json({ status: "failed", message: err?.message || "An error occurred" });
  }
};

const getPost = async (req, res) => {
  const { postSlug } = req.params;

  try {
    const foundPost = await Post.findOne({ slug: postSlug })
      .populate("author", "username role")
      .exec();
    if (!foundPost)
      return res
        .status(404)
        .json({ status: "failed", message: "Post Not Found!" });

    console.log(foundPost);

    return res.status(200).json({ status: "success", data: foundPost });
  } catch (err) {
    res.status(500).json({
      status: "failed",
      message: err?.message || "Something went wrong",
    });
  }
};

module.exports = { createPost, allPosts, getPost };

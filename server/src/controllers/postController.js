const cloudinary = require("../utils/cloudinary");
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

    return res.status(200).json({ status: "success", data: foundPost });
  } catch (err) {
    res.status(500).json({
      status: "failed",
      message: err?.message || "Something went wrong",
    });
  }
};

const editPost = async (req, res) => {
  try {
    const { postSlug } = req.params;
    const { postTitle, content, category } = req.body;

    // Updating other Fields
    const postUpdate = { postTitle, content, category };

    // Fetching Post Data from server
    const foundPost = await Post.findOne({ slug: postSlug });

    if (!foundPost) {
      return res
        .status(404)
        .json({ status: "failed", message: "Post Not Found" });
    }

    // Checking if a new Post img was uploaded
    if (req.file) {
      // Deleting the Old image
      const oldImgUrl = foundPost?.file;
      if (oldImgUrl) {
        // Extracting the public ID from the old image URL
        const imgPublicId = oldImgUrl?.split("/")?.pop()?.split(".")[0];
        await cloudinary?.uploader?.destroy(imgPublicId);
      }

      // Saving the new Image
      const newImgUrl = req?.file?.path;
      postUpdate.file = newImgUrl;
    }

    await Post.findOneAndUpdate({ slug: postSlug }, postUpdate);
    return res
      .status(200)
      .json({ status: "success", message: "Updated successfully." });
  } catch (err) {
    return res.status(500).json({
      status: "failed",
      message: err?.message || "Something went wrong while updating",
    });
  }
};

const deletePost = async (req, res) => {
  try {
    const { postSlug } = req.params;
    const deleteResult = await Post.findOneAndDelete({ slug: postSlug });

    return res
      .status(200)
      .json({ status: "success", message: "Deleted Successfully" });
  } catch (err) {
    return res
      .status(500)
      .json({ status: "failed", message: "Deletion not Successful" });
  }
};

module.exports = { createPost, allPosts, getPost, editPost, deletePost };

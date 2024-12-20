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
        .json({ status: "success", message: "Post Created Successfully" });
    } catch (err) {
      if (err.errorResponse.code === 11000) {
        err.message = "post title already exists";
      }
      return res.status(500).json({
        status: "failure",
        message: err?.message || "Couldn't Create Post...",
      });
    }
  }
};

const allPosts = async (req, res) => {
  const user = req.user;
  if (user?.role === "superAdmin") {
    try {
      const { page = 1, limit = 10 } = req.query; // Default page = 1 and limit = 10
      const allPosts = await Post.find()
        .sort({ createdAt: -1 }) // Sort by latest first
        .skip((page - 1) * limit) // Skip documents for previous pages
        .limit(parseInt(limit)) // Limit number of documents per page;
        .populate("author", "username role")
        .exec();

      const total = await Post.countDocuments(); // Total number of documents

      return res.status(200).json({
        status: "success",
        data: allPosts,
        totalPages: Math.ceil(total / limit),
        currentPage: parseInt(page),
        totalItems: total,
      });
    } catch (err) {
      return res.status(500).json({
        status: "failed",
        message: err?.message || "An error occurred",
      });
    }
  }
  try {
    const { page = 1, limit = 10 } = req.query; // Default page = 1 and limit = 10
    const allPosts = await Post.find({ author: user.id })
      .sort({ createdAt: -1 }) // Sort by latest first
      .skip((page - 1) * limit) // Skip documents for previous pages
      .limit(parseInt(limit)) // Limit number of documents per page;
      .populate("author", "username role")
      .exec();

    const total = await Post.countDocuments(); // Total number of documents
    return res.status(200).json({
      status: "success",
      data: allPosts,
      totalPages: Math.ceil(total / limit),
      currentPage: parseInt(page),
      totalItems: total,
    });
  } catch (error) {
    return res.status(500).json({
      status: "failed",
      message: err?.message || "An error occurred",
    });
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
        // Extract public ID (folder path + image name) from the URL
        const imgPublicId = oldImgUrl
          .split("/image/upload/")[1] // Extract everything after "upload/"
          ?.split(".")[0] // Remove the file extension
          ?.split("/") // Split into parts
          .slice(1) // Skip the version part
          .join("/"); // Rejoin from folder onward

        if (imgPublicId) {
          await cloudinary.uploader.destroy(imgPublicId);
        } else {
          console.error("Failed to extract public ID from URL");
        }
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
    const foundPost = await Post.findOne({ slug: postSlug });

    if (!foundPost) {
      return res
        .status(404)
        .json({ status: "failed", message: "No Post found." });
    }

    if (foundPost?.file) {
      // Deleting the image before the the post
      const ImgUrl = foundPost.file;

      // Extract public ID (folder path + image name) from the URL
      const imgPublicId = ImgUrl.split("/image/upload/")[1] // Extract everything after "upload/"
        ?.split(".")[0] // Remove the file extension
        ?.split("/") // Split into parts
        .slice(1) // Skip the version part
        .join("/"); // Rejoin from folder onward

      if (imgPublicId) {
        await cloudinary.uploader.destroy(imgPublicId);
      } else {
        console.error("Failed to extract public ID from URL");
      }
    }
    await Post.findOneAndDelete({ slug: postSlug });

    return res
      .status(200)
      .json({ status: "success", message: "Deleted Successfully" });
  } catch (err) {
    console.log(err.message);
    return res
      .status(500)
      .json({ status: "failed", message: "Deletion not Successful" });
  }
};

module.exports = { createPost, allPosts, getPost, editPost, deletePost };

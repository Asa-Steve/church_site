const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../utils/cloudinary");

// Configure Cloudinary Storage
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "church_posts", // Folder name in Cloudinary
    allowed_formats: ["jpg", "png", "jpeg"], // Allowed file types
  },
});

// Multer setup with size limits and error handling
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // Limit file size to 5MB
});

// Enhanced Middleware to Handle Errors Gracefully
const uploadMiddleware = (req, res, next) => {
  upload.single("img")(req, res, (err) => {
    if (err) {
      if (err.code === "LIMIT_FILE_SIZE") {
        return res.status(400).json({
          message: "File size too large. Maximum allowed size is 5MB.",
        });
      }
      console.error("Upload Error:", err.message);
      return res.status(400).json({ message: "Image upload failed." });
    }
    next();
  });
};

module.exports = uploadMiddleware;

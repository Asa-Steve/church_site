const router = require("express").Router();
const { createPost } = require("../controllers/postController");
const uploadMiddleware = require("../middleware/UploadMiddleware");

router.post("/create", uploadMiddleware.single("postImg"), createPost);

module.exports = router;

const router = require("express").Router();
const {
  createPost,
  allPosts,
  getPost,
} = require("../controllers/postController");
const uploadMiddleware = require("../middleware/UploadMiddleware");
const verifyToken = require("../middleware/verifyToken");

router.get("/", allPosts);
router.get("/:postSlug", getPost);
router.post(
  "/create",
  verifyToken,
  uploadMiddleware.single("postImg"),
  createPost
);

module.exports = router;

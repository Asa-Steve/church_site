const router = require("express").Router();
const {
  createPost,
  allPosts,
  getPost,
  editPost,
  deletePost,
} = require("../controllers/postController");
const uploadMiddleware = require("../middleware/UploadMiddleware");
const verifyToken = require("../middleware/verifyToken");

router.get("/", verifyToken, allPosts);
router.get("/:postSlug", getPost);
router.post("/create", verifyToken, uploadMiddleware, createPost);

router.put("/:postSlug", verifyToken, uploadMiddleware, editPost);

router.delete("/:postSlug", verifyToken, deletePost);
module.exports = router;

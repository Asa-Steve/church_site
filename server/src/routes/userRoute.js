const router = require("express").Router();
const {
  login,
  verify,
  create,
  users,
} = require("../controllers/userController");
const uploadMiddleware = require("../middleware/UploadMiddleware");
const verifyPassword = require("../middleware/verifyPassword");
const verifyToken = require("../middleware/verifyToken");

router.get("/", verifyToken, users);
router.post("/login", verifyPassword, login);
router.post("/verify-token", verifyToken, verify);
router.post("/create", verifyToken, uploadMiddleware, create);
module.exports = router;

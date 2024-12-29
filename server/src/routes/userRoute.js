const router = require("express").Router();
const {
  login,
  verify,
  create,
  users,
  update
} = require("../controllers/userController");
const uploadMiddleware = require("../middleware/UploadMiddleware");
const verifyPassword = require("../middleware/verifyPassword");
const verifyToken = require("../middleware/verifyToken");

router.get("/", verifyToken, users);
router.put("/", verifyToken, uploadMiddleware, update);
router.post("/login", verifyPassword, login);
router.post("/verify-token", verifyToken, verify);
router.post("/create", verifyToken, uploadMiddleware, create);
module.exports = router;

const router = require("express").Router();
const { login, verify } = require("../controllers/userController");
const verifyPassword = require("../middleware/verifyPassword");
const verifyToken = require("../middleware/verifyToken");

router.post("/login", verifyPassword, login);
router.post("/verify-token", verifyToken, verify);

module.exports = router;

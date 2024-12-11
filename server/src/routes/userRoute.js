const router = require("express").Router();
const { login } = require("../controllers/userController");
const verifyPassword = require("../middleware/verifyPassword");

router.post("/login", verifyPassword, login);

module.exports = router;

const router = require("express").Router();

const sendMail = require("../controllers/mailController");

router.post("/", sendMail);

module.exports = router;

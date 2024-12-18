const { allRequests } = require("../controllers/requestController");
const verifyToken = require("../middleware/verifyToken");

const router = require("express").Router();

router.get("/", verifyToken, allRequests);

module.exports = router;

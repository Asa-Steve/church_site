const router = require("express").Router();
const {
  getInfants,
  getInfant,
//   createInfant,
//   updateInfant,
//   deleteInfant,
} = require("../controllers/infantController");
const verifyToken = require("../middleware/verifyToken");

router.get("/", verifyToken, getInfants);
// router.get("/:id", verifyToken, getInfant);


module.exports = router;

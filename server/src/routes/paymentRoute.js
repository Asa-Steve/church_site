const {
  verifyPayment,
  initializePayment,
} = require("../controllers/paymentController");

const router = require("express").Router();

router.post("/makePayment", initializePayment);
router.post("/verifyPayment", verifyPayment);

module.exports = router;

const {
  verifyPayment,
  initializePayment,
  allPayments,
} = require("../controllers/paymentController");
const verifyToken = require("../middleware/verifyToken");

const router = require("express").Router();

router.get("/payments",verifyToken, allPayments);
router.post("/makePayment", initializePayment);
router.post("/verifyPayment", verifyPayment);

module.exports = router;

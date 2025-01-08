const router = require("express").Router();
const {
  recordBaptism,
  recordMarriage,
  recordFile,
  getRecordById,
  getRecordByDate,
  getRecordByName,
} = require("../controllers/recordController");
const verifyToken = require("../middleware/verifyToken");
const upload = require("../middleware/uploadMiddlewareRecord");

router.post("/baptism", verifyToken, recordBaptism);
router.post("/marriage", verifyToken, recordMarriage);
router.post("/bulk-upload", verifyToken, upload, recordFile);

router.get("/searchbyid", getRecordById);
router.get("/searchbydate", getRecordByDate);
router.get("/searchbyname", getRecordByName);
module.exports = router;

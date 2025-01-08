const multer = require("multer");
const path = require("path");

// Creating the uploads directory if it doesn't exist
const fs = require("fs");
const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Configure Multer for Excel file uploads
const uploadMiddlewareRecord = multer({
  dest: "uploads/", // Temporary upload directory
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype ===
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    ) {
      cb(null, true); // Accept the file
    } else {
      cb(new Error("Only .xlsx files are allowed!")); // Reject the file
    }
  },
});

module.exports = uploadMiddlewareRecord.single("file");

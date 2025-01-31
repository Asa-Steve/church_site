const handleError = (err, req, res, next) => {
  if (err?.message === "Only .xlsx files are allowed!") {
    return res.status(400).json({ message: err.message }); // Custom response
  }
  // Handle any other errors
  return res.status(500).json({ message: "An unexpected error occurred." });
};

module.exports = handleError;

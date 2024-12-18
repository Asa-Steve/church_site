const Request = require("../models/massRequestSchema");

const allRequests = async (req, res) => {
  try {
    const { page = 1, limit = 4 } = req.query; // Default page = 1 and limit = 4
    const foundRequests = await Request.find()
      .sort({ createdAt: -1 }) // Sort by latest first
      .skip((page - 1) * limit) // Skip documents for previous pages
      .limit(parseInt(limit)); // Limit number of documents per page

    const total = await Request.countDocuments(); // Total number of documents

    res.status(200).json({
      status: "success",
      data: foundRequests,
      totalPages: Math.ceil(total / limit),
      currentPage: parseInt(page),
      totalItems: total,
    });
  } catch (err) {
    res.status(500).json({
      status: "failed",
      message: err?.message || "something went wrong",
    });
  }
};

module.exports = { allRequests };

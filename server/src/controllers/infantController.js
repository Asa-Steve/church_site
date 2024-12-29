const Infant = require("../models/infantBaptismSchema");

const getInfants = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query; // Default page = 1 and limit = 10

    const infants = await Infant.find()
      .sort({ createdAt: -1 }) // Sort by latest first
      .skip((page - 1) * limit) // Skip documents for previous pages
      .limit(parseInt(limit)) // Limit number of documents per page;
      .exec();

    const total = await Infant.countDocuments(); // Total number of documents

    return res.status(200).json({
      status: "success",
      data: infants,
      totalPages: Math.ceil(total / limit),
      currentPage: parseInt(page),
      totalItems: total,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: "failure",
      message: "Couldn't get Infants at the moment. Try again later.",
    });
  }
};

module.exports = { getInfants };

require("dotenv").config();
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

const verifyToken = async (req, res, next) => {
  const token = req.headers?.authorization?.split(" ")[1];

  if (!token) {
    return res
      .status(400)
      .json({ success: false, message: "Token is required" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // verifying with JWT secret
    req.user = decoded;
    next();
  } catch (err) {
    console.log("err from 401 in server");
    res
      .status(401)
      .json({ success: false, message: "Invalid or expired token" });
  }
};

module.exports = verifyToken;

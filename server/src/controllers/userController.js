require("dotenv").config();
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

const login = (req, res) => {
  const { user } = req;

  const token = jwt.sign(user, JWT_SECRET, { expiresIn: "1hr" });
  return res.status(200).json({ message: "successfully logged In", token });
};

const verify = (req, res) => {
  return res
    .status(200)
    .json({ success: true, user: req.user, message: "Acess Granted." });
};

module.exports = { login, verify };

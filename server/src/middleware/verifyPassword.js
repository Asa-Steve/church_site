const bcrypt = require("bcrypt");
const User = require("../models/userSchema");

const verifyPassword = async (req, res, next) => {
  const { username, password } = req.body;

  try {
    const foundUser = await User.findOne({ username: username });

    if (foundUser) {
      const match = await bcrypt.compare(password, foundUser.password);
      if (match) {
        next();
      } else {
        return res.status(400).json({ error: "Invalid username or Password" });
      }
    } else {
      return res.status(404).json({ error: "No User Found" });
    }
  } catch (err) {
    return res.status(500).json({ err: "Something went wrong." });
  }
};

module.exports = verifyPassword;

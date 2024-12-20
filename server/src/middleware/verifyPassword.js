const bcrypt = require("bcrypt");
const User = require("../models/userSchema");

const verifyPassword = async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const foundUser = await User.findOne({ username: username }).lean();
    if (foundUser) {
      const match = await bcrypt.compare(password, foundUser.password);
      if (match) {
        req.user = {
          id: foundUser._id,
          username: foundUser.username,
          role: foundUser.role,
          img: foundUser.img,
        };
        next();
      } else {
        return res
          .status(400)
          .json({ message: "Invalid username or Password" });
      }
    } else {
      return res.status(404).json({ message: "No User Found" });
    }
  } catch (err) {
    return res.status(500).json({ message: "Something went wrong." });
  }
};

module.exports = verifyPassword;

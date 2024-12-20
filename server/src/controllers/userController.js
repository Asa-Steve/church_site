require("dotenv").config();
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;
const User = require("../models/userSchema");
const bcrypt = require("bcrypt");

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

const create = async (req, res) => {
  try {
    if (req?.user?.role !== "superAdmin") {
      return res.status(403).json({
        status: "failed",
        message: "Youre Not Authorized to view this Page",
      });
    }
    const imgUrl = req?.file?.path;
    const { username, password, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      username,
      password: hashedPassword,
      role,
      img: imgUrl && imgUrl,
      email: `${username.split(" ").join("").toLowerCase()}@changethis.com`,
    });
    await newUser.save();

    return res
      .status(200)
      .json({ status: "success", message: "User created successfully" });
  } catch (err) {
    const errorKey = Object.keys(err?.errorResponse?.keyValue)[0];
    if (err?.errorResponse?.code === 11000) {
      err.msg = `${
        errorKey === "email" ? "username" : errorKey
      } already exists`;
    }
    return res.status(500).json({
      status: "failure",
      message: err?.msg || "Something went wrong while creating user",
    });
  }
};

const users = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query; // Default page = 1 and limit = 10

    if (req.user.role !== "superAdmin") {
      return res.status(403).json({
        status: "failed",
        message: "Youre Not Authorized to view this Page",
      });
    }

    const superAdminId = req.user.id;
    const foundUsers = await User.find({ _id: { $ne: superAdminId } }) // Exclude Admin user by ID
      .sort({ createdAt: -1 }) // Sort by latest first
      .skip((page - 1) * limit) // Skip documents for previous pages
      .limit(parseInt(limit)) // Limit number of documents per page;
      .exec();
    const total = await User.countDocuments(); // total number of users
    return res.status(200).json({
      status: "success",
      data: foundUsers,
      totalPages: Math.ceil((total - 1) / limit),
      currentPage: parseInt(page),
      totalItems: total - 1,
    });
  } catch (err) {
    return res
      .status(500)
      .json({ status: "failed", message: err?.message || "An error occurred" });
  }
};
module.exports = { login, verify, create, users };

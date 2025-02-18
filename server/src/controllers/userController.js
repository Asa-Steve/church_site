require("dotenv").config();
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;
const User = require("../models/userSchema");
const bcrypt = require("bcrypt");
const { v2: cloudinary } = require("cloudinary");
const crypto = require("crypto");
const nodemailer = require("nodemailer");

// Create transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PW,
  },
});

const login = (req, res) => {
  try {
    const { user } = req;
    const token = jwt.sign(user, JWT_SECRET, { expiresIn: "1hr" });

    return res.status(200).json({ message: "successfully logged In", token });
  } catch (err) {
    return res
      .status(500)
      .json({ status: "failure", message: "Couldn't Login." });
  }
};

const verify = (req, res) => {
  return res
    .status(200)
    .json({ success: true, user: req.user, message: "Acess Granted." });
};

const create = async (req, res) => {
  try {
    // Checking if one is even Authorized to be here
    if (req?.user?.role !== "superAdmin" && req?.user?.role !== "secretary") {
      return res.status(403).json({
        status: "failed",
        message: "Youre Not Authorized!",
      });
    }

    if (req?.user?.role !== "superAdmin") {
      if (req?.user?.role === "secretary") {
        if (
          req?.body?.role === "superAdmin" ||
          req?.body?.role === "secretary"
        ) {
          return res.status(403).json({
            status: "failed",
            message: "Youre Not Authorized to create this type of User",
          });
        }
      } else {
        return res.status(403).json({
          status: "failed",
          message: "Youre Not Authorized to create a user",
        });
      }
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
    console.log(err);
    const errorKey =
      err?.errorResponse?.keyValue &&
      Object.keys(err?.errorResponse?.keyValue)[0];
    if (errorKey && err?.errorResponse?.code === 11000) {
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

const update = async (req, res) => {
  const { userId } = req.query;
  try {
    const { user } = req; //Logged in User

    const { username, email, newPassword } = req.body; // New User Data from Request

    const img = req?.file?.path; // Image from Request

    const userUpdate = {};

    const foundUser = await User.findById(user.id);

    if (!foundUser) {
      return res.status(404).json({
        status: "failed",
        message: "User not found",
      });
    }

    // Using Logged in User to check if user is not SuperAdmin and not trying to change another user details
    if (user.role !== "superAdmin" && user.id !== foundUser.id) {
      return res.status(403).json({
        status: "failed",
        message: "Youre Not Authorized to make changes to this User",
      });
    }

    // checking if user is trying to update his own profile pic and deleting the old one
    if (foundUser?.img) {
      // Deleting the image before the updating the new one to profile
      const ImgUrl = foundUser.img; // Get the image URL from the user data

      // Extract public ID (folder path + image name) from the URL
      const imgPublicId = ImgUrl.split("/image/upload/")[1] // Extract everything after "upload/"
        ?.split(".")[0] // Remove the file extension
        ?.split("/") // Split into parts
        .slice(1) // Skip the version part
        .join("/"); // Rejoin from folder onward

      if (imgPublicId) {
        await cloudinary.uploader.destroy(imgPublicId);
      } else {
        console.error("Failed to extract public ID from URL");
      }
    }

    if (userId) {
      // If userId is provided in query,it shows an superAdmin is trying to update another user details so we use that
      if (user.role === "superAdmin") {
        //checking if loggedin user is superAdmin
        const foundUser = await User.findById(userId); // searching for user with userId in DB

        if (newPassword) {
          const hashedPassword = await bcrypt.hash(newPassword, 10);
          userUpdate.password = hashedPassword;
        }
        img && (userUpdate.img = img);
        email && (userUpdate.email = email);
        username && (userUpdate.username = username);

        await User.findByIdAndUpdate(userId, userUpdate);

        return res.status(200).json({
          status: "success",
          message: "User Profile updated successfully",
        });
      }
    }

    // if there is no userId in query, it means user is updating his own profile
    if (newPassword) {
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      userUpdate.password = hashedPassword;
    }
    img && (userUpdate.img = img);
    email && (userUpdate.email = email);
    username && (userUpdate.username = username);

    const updatedData = await User.findByIdAndUpdate(user.id, userUpdate, {
      new: true,
    });
    const { password, ...otherFields } = updatedData._doc;

    otherFields.id = otherFields._id;

    const token = jwt.sign(otherFields, JWT_SECRET, { expiresIn: "1hr" });

    return res.status(200).json({
      status: "success",
      message: "User updated successfully",
      token,
    });
  } catch (err) {
    return res.status(500).json({
      status: "failed",
      message: err?.message || "An error occurred",
    });
  }
};

const users = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query; // Default page = 1 and limit = 10
    const userId = req?.user?.id;

    // Query Filter
    const filters = {
      _id: { $ne: userId },
      role: { $ne: "superAdmin" },
    };

    if (req.user.role !== "superAdmin" && req?.user.role !== "secretary") {
      return res.status(403).json({
        status: "failed",
        message: "Youre Not Authorized!",
      });
    }

    if (req.user.role === "secretary") {
      const foundUsers = await User.find(filters) // Exclude Admin user by ID
        .sort({ createdAt: -1 }) // Sort by latest first
        .skip((page - 1) * limit) // Skip documents for previous pages
        .limit(parseInt(limit)) // Limit number of documents per page;
        .select("-password") // Exclude password field
        .exec();

      // Get total filtered user count
      const total = await User.countDocuments(filters); // Use the same filters

      return res.status(200).json({
        status: "success",
        data: foundUsers,
        totalPages: Math.ceil(total / limit),
        currentPage: parseInt(page),
        totalItems: total,
      });
    }

    const foundUsers = await User.find({ _id: { $ne: userId } }) // Exclude Admin user by ID
      .sort({ createdAt: -1 }) // Sort by latest first
      .skip((page - 1) * limit) // Skip documents for previous pages
      .limit(parseInt(limit)) // Limit number of documents per page;
      .select("-password") // Exclude password field
      .exec();

    const total = await User.countDocuments({ _id: { $ne: userId } }); // total number of users
    return res.status(200).json({
      status: "success",
      data: foundUsers,
      totalPages: Math.ceil(total / limit),
      currentPage: parseInt(page),
      totalItems: total,
    });
  } catch (err) {
    return res.status(500).json({
      status: "failed",
      message: err?.message || "Something went wrong while fetching users.",
    });
  }
};

const user = async (req, res) => {
  try {
    const { userId: id } = req.params;
    const { user: loggedInUser } = req;

    const foundUser = await User.findById(id).select("-password");

    if (loggedInUser.role !== "superAdmin" && loggedInUser.id !== id) {
      return res.status(403).json({
        status: "failed",
        message: "Youre Not Authorized to view Document",
      });
    }

    if (!foundUser) {
      return res.status(404).json({
        status: "failed",
        message: "User not found",
      });
    }

    return res.status(200).json({
      status: "success",
      data: foundUser,
    });
  } catch (err) {
    return res.status(500).json({
      status: "failed",
      message: err?.message || "An error occurred",
    });
  }
};

const deleteUser = async (req, res) => {
  const { userId } = req.params;

  const { user } = req;
  if (user?.role !== "superAdmin") {
    return res.status(403).json({
      status: "failed",
      message: "Youre Not Authorized to delete this User",
    });
  }

  try {
    const foundUser = await User.findById(userId);

    // checking if user has profile pic and deleting image before finally deleting User
    if (foundUser?.img) {
      // Deleting the image before the deleting the User
      const ImgUrl = foundUser.img; // Get the image URL from the user data

      // Extract public ID (folder path + image name) from the URL
      const imgPublicId = ImgUrl.split("/image/upload/")[1] // Extract everything after "upload/"
        ?.split(".")[0] // Remove the file extension
        ?.split("/") // Split into parts
        .slice(1) // Skip the version part
        .join("/"); // Rejoin from folder onward

      if (imgPublicId) {
        await cloudinary.uploader.destroy(imgPublicId);
      } else {
        console.error("Failed to extract public ID from URL");
      }
    }

    await User.findByIdAndDelete(userId);
    return res
      .status(200)
      .json({ status: "success", message: "User deleted successfully" });
  } catch (err) {
    return res.status(500).json({
      status: "failed",
      message: err?.message || "An error occurred",
    });
  }
};

const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        status: "failure",
        message: "Email is required",
      });
    }

    const foundUser = await User.findOne({ email });
    if (!foundUser) {
      return res
        .status(404)
        .json({ status: "failure", message: "User not found" });
    }

    // Generate a token to reset password
    const resetToken = crypto.randomBytes(32).toString("hex");
    const hashedToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    // Set token expiry time
    // const expTime = Date.now() + 3600000; // Token expires in 1 hour
    const expTime = Date.now() + 60 * 60 * 1000; // Token expires in 2 minutes

    // Saving both the hashed token and the expiry time to the user document
    foundUser.resetPwToken = hashedToken;
    foundUser.resetPwExpire = expTime;

    await foundUser.save();

    // Sending the email with the reset token
    const adminMail = process.env.MAIL_USER;
    const resetURL = `https://mount-zion.onrender.com/reset-password/${resetToken}`;
    const message = `You requested a password reset. Click the link to reset your password: ${resetURL}`;

    await transporter.sendMail({
      from: adminMail,
      to: email,
      subject: "Password Reset Request",
      text: message,
    });
    res.status(200).json({
      satatus: "success",
      message: "check your email for password reset link",
    });
  } catch (err) {
    return res.status(500).json({
      status: "failure",
      message: err?.message || "An error occurred",
    });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { resetToken, password } = req.body;

    // Hashing the new password
    const hashedPw = await bcrypt.hash(password, 10);

    const hashedToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");
    const foundUser = await User.findOne({
      resetPwToken: hashedToken,
      resetPwExpire: { $gt: Date.now() },
    });
    if (!foundUser) {
      return res
        .status(400)
        .json({ message: "Token is invalid or has expired" });
    }

    // Updating password
    foundUser.password = hashedPw; // saving Hashed password
    foundUser.resetPwToken = undefined; //removing reset token
    foundUser.resetPwExpire = undefined; //removing reset token expiry time

    // Save the updated user document
    await foundUser.save();

    res
      .status(200)
      .json({ status: "success", message: "Password updated successfully" });
  } catch (err) {
    res
      .status(500)
      .json({ status: "failure", message: "Error updating password" });
  }
};

module.exports = {
  login,
  verify,
  create,
  users,
  update,
  user,
  deleteUser,
  forgotPassword,
  resetPassword,
};

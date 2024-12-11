const login = (req, res) => {
  console.log("Sucessfully Logged in");
  return res
    .status(200)
    .json({ message: "successfully logged In, redirecting..." });
};

module.exports = { login };

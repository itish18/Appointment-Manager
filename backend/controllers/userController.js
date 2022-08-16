const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/userModel");

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  // Check user and passwords match
  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(401).json("Invalid credentials");
  }
});

const signupUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    const hashedPwd = await bcrypt.hash(password, 10);
    User.create({
      name,
      email,
      password: hashedPwd,
    }).then((result) =>
      res.status(200).json({
        _id: result._id,
        name: result.name,
        email: result.email,
        token: generateToken(result._id),
      })
    );
  } else {
    res.status(401).json("User already exists");
  }
});

const getMe = asyncHandler(async (req, res) => {
  const user = {
    id: req.user._id,
    email: req.user.email,
    name: req.user.name,
  };

  res.status(200).json(user);
});

// Generate token
const generateToken = (id) => {
  return jwt.sign({ id }, "secret", {
    expiresIn: "1d",
  });
};

module.exports = {
  loginUser,
  signupUser,
  getMe,
};

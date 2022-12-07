const express = require("express");
const router = express.Router();
const {
  signupUser,
  loginUser,
  getMe,
} = require("../controllers/userController");

const { protect } = require("../middleware/authMiddleware");
router.post("/login", loginUser);
router.post("/signup", signupUser);
router.get("/me", protect, getMe);

module.exports = router;

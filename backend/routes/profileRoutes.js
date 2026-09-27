const express = require("express");
const protect = require("../middleware/authMiddleware");
const User = require("../models/User");

const router = express.Router();

// ======================================================
// GET LOGGED-IN USER PROFILE
// ======================================================
router.get("/profile", protect, async (req, res) => {
  try {
    // Find user using ID from JWT
    const user = await User.findById(req.user.id).select("-password");

    // Check user exists
    if (!user) {
      return res.status(404).json({
        message: "User not found.",
      });
    }

    // Send user profile
    res.status(200).json({
      message: "Profile fetched successfully.",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Profile Error:", error);

    res.status(500).json({
      message: "Failed to fetch profile.",
      error: error.message,
    });
  }
});

module.exports = router;
const express = require("express");
const Theatre = require("../models/Theatre");

const router = express.Router();

// ======================================================
// CREATE THEATRE
// ======================================================
router.post("/", async (req, res) => {
  try {
    const theatre = await Theatre.create(req.body);

    res.status(201).json({
      message: "Theatre created successfully.",
      theatre,
    });
  } catch (error) {
    console.error("Create Theatre Error:", error);

    res.status(500).json({
      message: "Failed to create theatre.",
      error: error.message,
    });
  }
});

// ======================================================
// GET ALL THEATRES
// ======================================================
router.get("/", async (req, res) => {
  try {
    const theatres = await Theatre.find().sort({ createdAt: -1 });

    res.status(200).json({
      message: "Theatres fetched successfully.",
      count: theatres.length,
      theatres,
    });
  } catch (error) {
    console.error("Get Theatres Error:", error);

    res.status(500).json({
      message: "Failed to fetch theatres.",
      error: error.message,
    });
  }
});

// ======================================================
// GET SINGLE THEATRE
// ======================================================
router.get("/:id", async (req, res) => {
  try {
    const theatre = await Theatre.findById(req.params.id);

    if (!theatre) {
      return res.status(404).json({
        message: "Theatre not found.",
      });
    }

    res.status(200).json({
      message: "Theatre fetched successfully.",
      theatre,
    });
  } catch (error) {
    console.error("Get Theatre Error:", error);

    res.status(500).json({
      message: "Failed to fetch theatre.",
      error: error.message,
    });
  }
});

module.exports = router;
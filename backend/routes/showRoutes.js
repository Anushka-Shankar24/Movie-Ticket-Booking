const express = require("express");
const mongoose = require("mongoose");

const Show = require("../models/Show");
const Movie = require("../models/Movie");
const Theatre = require("../models/Theatre");

const router = express.Router();

// ======================================================
// CREATE SHOW
// ======================================================
router.post("/", async (req, res) => {
  try {
    const { movie, theatre, location, date, time } = req.body;

    // Check required fields
    if (!movie || !theatre || !location || !date || !time) {
      return res.status(400).json({
        message: "Please provide movie, theatre, location, date and time.",
      });
    }

    // Check movie ID
    if (!mongoose.Types.ObjectId.isValid(movie)) {
      return res.status(400).json({
        message: "Invalid movie ID.",
      });
    }

    // Check theatre ID
    if (!mongoose.Types.ObjectId.isValid(theatre)) {
      return res.status(400).json({
        message: "Invalid theatre ID.",
      });
    }

    // ==================================================
    // CHECK MOVIE
    // ==================================================
    const movieExists = await Movie.findById(movie);

    if (!movieExists) {
      return res.status(404).json({
        message: "Movie not found.",
      });
    }

    // ==================================================
    // CHECK THEATRE
    // ==================================================
    const theatreExists = await Theatre.findById(theatre);

    if (!theatreExists) {
      return res.status(404).json({
        message: "Theatre not found.",
      });
    }

    // ==================================================
    // CHECK DATE
    // ==================================================
    const selectedDate = new Date(date);

    if (isNaN(selectedDate.getTime())) {
      return res.status(400).json({
        message: "Invalid date.",
      });
    }

    // Prevent past dates
    const today = new Date();

    today.setHours(0, 0, 0, 0);
    selectedDate.setHours(0, 0, 0, 0);

    if (selectedDate < today) {
      return res.status(400).json({
        message: "Show date cannot be in the past.",
      });
    }

    // ==================================================
    // CHECK DUPLICATE SHOW
    // ==================================================
    const existingShow = await Show.findOne({
      movie,
      theatre,
      date: selectedDate,
      time,
    });

    if (existingShow) {
      return res.status(400).json({
        message: "This show already exists.",
      });
    }

    // ==================================================
    // CREATE SHOW
    // ==================================================
    const show = await Show.create({
      movie,
      theatre,
      location,
      date: selectedDate,
      time,
    });

    res.status(201).json({
      message: "Show created successfully.",
      show,
    });
  } catch (error) {
    console.error("Create Show Error:", error);

    res.status(500).json({
      message: "Failed to create show.",
      error: error.message,
    });
  }
});

// ======================================================
// GET ALL SHOWS
// ======================================================
router.get("/", async (req, res) => {
  try {
    const shows = await Show.find()
      .populate("movie")
      .populate("theatre")
      .sort({ date: 1, time: 1 });

    res.status(200).json({
      message: "Shows fetched successfully.",
      count: shows.length,
      shows,
    });
  } catch (error) {
    console.error("Get Shows Error:", error);

    res.status(500).json({
      message: "Failed to fetch shows.",
      error: error.message,
    });
  }
});

// ======================================================
// GET SHOWS BY MOVIE
// ======================================================
router.get("/movie/:movieId", async (req, res) => {
  try {
    const { movieId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(movieId)) {
      return res.status(400).json({
        message: "Invalid movie ID.",
      });
    }

    const shows = await Show.find({
      movie: movieId,
    })
      .populate("movie")
      .populate("theatre")
      .sort({ date: 1, time: 1 });

    res.status(200).json({
      message: "Movie shows fetched successfully.",
      count: shows.length,
      shows,
    });
  } catch (error) {
    console.error("Get Movie Shows Error:", error);

    res.status(500).json({
      message: "Failed to fetch movie shows.",
      error: error.message,
    });
  }
});

// ======================================================
// GET SHOWS BY MOVIE AND DATE
// ======================================================
router.get("/movie/:movieId/date/:date", async (req, res) => {
  try {
    const { movieId, date } = req.params;

    if (!mongoose.Types.ObjectId.isValid(movieId)) {
      return res.status(400).json({
        message: "Invalid movie ID.",
      });
    }

    const selectedDate = new Date(date);

    if (isNaN(selectedDate.getTime())) {
      return res.status(400).json({
        message: "Invalid date.",
      });
    }

    selectedDate.setHours(0, 0, 0, 0);

    const nextDate = new Date(selectedDate);
    nextDate.setDate(nextDate.getDate() + 1);

    const shows = await Show.find({
      movie: movieId,
      date: {
        $gte: selectedDate,
        $lt: nextDate,
      },
    })
      .populate("movie")
      .populate("theatre")
      .sort({ time: 1 });

    res.status(200).json({
      message: "Shows fetched successfully.",
      movieId,
      date,
      count: shows.length,
      shows,
    });
  } catch (error) {
    console.error("Get Shows By Date Error:", error);

    res.status(500).json({
      message: "Failed to fetch shows by date.",
      error: error.message,
    });
  }
});

// ======================================================
// GET SINGLE SHOW
// ======================================================
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid show ID.",
      });
    }

    const show = await Show.findById(id)
      .populate("movie")
      .populate("theatre");

    if (!show) {
      return res.status(404).json({
        message: "Show not found.",
      });
    }

    res.status(200).json({
      message: "Show fetched successfully.",
      show,
    });
  } catch (error) {
    console.error("Get Show Error:", error);

    res.status(500).json({
      message: "Failed to fetch show.",
      error: error.message,
    });
  }
});

// ======================================================
// UPDATE SHOW
// ======================================================
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid show ID.",
      });
    }

    const { movie, theatre, location, date, time } = req.body;

    if (!movie || !theatre || !location || !date || !time) {
      return res.status(400).json({
        message: "Please provide movie, theatre, location, date and time.",
      });
    }

    const selectedDate = new Date(date);

    if (isNaN(selectedDate.getTime())) {
      return res.status(400).json({
        message: "Invalid date.",
      });
    }

    const today = new Date();

    today.setHours(0, 0, 0, 0);
    selectedDate.setHours(0, 0, 0, 0);

    if (selectedDate < today) {
      return res.status(400).json({
        message: "Show date cannot be in the past.",
      });
    }

    const show = await Show.findByIdAndUpdate(
      id,
      {
        movie,
        theatre,
        location,
        date: selectedDate,
        time,
      },
      {
        new: true,
        runValidators: true,
      }
    )
      .populate("movie")
      .populate("theatre");

    if (!show) {
      return res.status(404).json({
        message: "Show not found.",
      });
    }

    res.status(200).json({
      message: "Show updated successfully.",
      show,
    });
  } catch (error) {
    console.error("Update Show Error:", error);

    res.status(500).json({
      message: "Failed to update show.",
      error: error.message,
    });
  }
});

// ======================================================
// DELETE SHOW
// ======================================================
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid show ID.",
      });
    }

    const show = await Show.findByIdAndDelete(id);

    if (!show) {
      return res.status(404).json({
        message: "Show not found.",
      });
    }

    res.status(200).json({
      message: "Show deleted successfully.",
    });
  } catch (error) {
    console.error("Delete Show Error:", error);

    res.status(500).json({
      message: "Failed to delete show.",
      error: error.message,
    });
  }
});

module.exports = router;
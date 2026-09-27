const express = require("express");
const Movie = require("../models/Movie");

const router = express.Router();

// ======================================================
// CREATE MOVIE
// ======================================================
router.post("/", async (req, res) => {
  try {
    const movie = await Movie.create(req.body);

    res.status(201).json({
      message: "Movie created successfully.",
      movie,
    });
  } catch (error) {
    console.error("Create Movie Error:", error);

    res.status(500).json({
      message: "Failed to create movie.",
      error: error.message,
    });
  }
});

// ======================================================
// GET ALL MOVIES
// ======================================================
router.get("/", async (req, res) => {
  try {
    const movies = await Movie.find().sort({ createdAt: -1 });

    res.status(200).json({
      message: "Movies fetched successfully.",
      count: movies.length,
      movies,
    });
  } catch (error) {
    console.error("Get Movies Error:", error);

    res.status(500).json({
      message: "Failed to fetch movies.",
      error: error.message,
    });
  }
});

// ======================================================
// GET SINGLE MOVIE
// ======================================================
router.get("/:id", async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);

    if (!movie) {
      return res.status(404).json({
        message: "Movie not found.",
      });
    }

    res.status(200).json({
      message: "Movie fetched successfully.",
      movie,
    });
  } catch (error) {
    console.error("Get Movie Error:", error);

    res.status(500).json({
      message: "Failed to fetch movie.",
      error: error.message,
    });
  }
});

// ======================================================
// UPDATE MOVIE
// ======================================================
router.put("/:id", async (req, res) => {
  try {
    const movie = await Movie.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!movie) {
      return res.status(404).json({
        message: "Movie not found.",
      });
    }

    res.status(200).json({
      message: "Movie updated successfully.",
      movie,
    });
  } catch (error) {
    console.error("Update Movie Error:", error);

    res.status(500).json({
      message: "Failed to update movie.",
      error: error.message,
    });
  }
});

// ======================================================
// DELETE MOVIE
// ======================================================
router.delete("/:id", async (req, res) => {
  try {
    const movie = await Movie.findByIdAndDelete(req.params.id);

    if (!movie) {
      return res.status(404).json({
        message: "Movie not found.",
      });
    }

    res.status(200).json({
      message: "Movie deleted successfully.",
    });
  } catch (error) {
    console.error("Delete Movie Error:", error);

    res.status(500).json({
      message: "Failed to delete movie.",
      error: error.message,
    });
  }
});

// ======================================================
// EXPORT ROUTER
// ======================================================
module.exports = router;
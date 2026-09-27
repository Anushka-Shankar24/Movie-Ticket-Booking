const express = require("express");

const {
  locations,
  cinemas,
  defaultCinemas,
} = require("../data/locations");

const router = express.Router();

// ======================================================
// GET ALL STATES
// ======================================================
router.get("/states", (req, res) => {
  try {
    const states = Object.keys(locations);

    res.status(200).json({
      message: "States fetched successfully.",
      count: states.length,
      states,
    });
  } catch (error) {
    console.error("Get States Error:", error);

    res.status(500).json({
      message: "Failed to fetch states.",
    });
  }
});

// ======================================================
// GET CITIES BY STATE
// ======================================================
router.get("/cities/:state", (req, res) => {
  try {
    const state = decodeURIComponent(req.params.state);

    const cities = locations[state];

    if (!cities) {
      return res.status(404).json({
        message: "State not found.",
      });
    }

    res.status(200).json({
      message: "Cities fetched successfully.",
      state,
      count: cities.length,
      cities,
    });
  } catch (error) {
    console.error("Get Cities Error:", error);

    res.status(500).json({
      message: "Failed to fetch cities.",
    });
  }
});

// ======================================================
// GET CINEMAS BY CITY
// ======================================================
router.get("/cinemas/:city", (req, res) => {
  try {
    const city = decodeURIComponent(req.params.city);

    const availableCinemas =
      cinemas[city] || defaultCinemas;

    res.status(200).json({
      message: "Cinemas fetched successfully.",
      city,
      count: availableCinemas.length,
      cinemas: availableCinemas,
    });
  } catch (error) {
    console.error("Get Cinemas Error:", error);

    res.status(500).json({
      message: "Failed to fetch cinemas.",
    });
  }
});

module.exports = router;
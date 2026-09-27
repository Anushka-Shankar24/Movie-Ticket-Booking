const mongoose = require("mongoose");

// ======================================================
// MOVIE SCHEMA
// ======================================================
const movieSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    genre: {
      type: String,
      required: true,
      trim: true,
    },

    language: {
      type: String,
      required: true,
      trim: true,
    },

    duration: {
      type: String,
      required: true,
      trim: true,
    },

    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 10,
    },

    releaseDate: {
      type: Date,
      required: true,
    },

    poster: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    trailer: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

// ======================================================
// EXPORT MOVIE MODEL
// ======================================================
module.exports = mongoose.model("Movie", movieSchema);
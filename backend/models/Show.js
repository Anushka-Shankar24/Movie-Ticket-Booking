const mongoose = require("mongoose");

// ======================================================
// SHOW SCHEMA
// ======================================================
const showSchema = new mongoose.Schema(
  {
    // Movie reference
    movie: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Movie",
      required: true,
    },

    // Theatre reference
    theatre: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Theatre",
      required: true,
    },

    // City / location
    location: {
      type: String,
      required: true,
      trim: true,
    },

    // Actual show date
    date: {
      type: Date,
      required: true,
    },

    // Show time
    time: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// ======================================================
// EXPORT
// ======================================================
module.exports = mongoose.model("Show", showSchema);
const mongoose = require("mongoose");

// ======================================================
// THEATRE SCHEMA
// ======================================================
const theatreSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    location: {
      type: String,
      required: true,
      trim: true,
    },

    city: {
      type: String,
      required: true,
      trim: true,
    },

    screens: {
      type: Number,
      required: true,
      min: 1,
    },

    facilities: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Theatre", theatreSchema);
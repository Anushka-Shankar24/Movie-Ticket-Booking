const express = require("express");
const Booking = require("../models/Booking");
const Movie = require("../models/Movie");
const Theatre = require("../models/Theatre");
const Show = require("../models/Show");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

/*
  GET BOOKED SEATS

  Is route se frontend kisi particular show ki
  already booked seats fetch karega.
*/
router.get("/seats", async (req, res) => {
  try {
    const { movie, theatre, date, showTime } = req.query;

    if (!movie || !theatre || !date || !showTime) {
      return res.status(400).json({
        message: "Movie, theatre, date and show time are required.",
      });
    }

    const startDate = new Date(date);
    startDate.setHours(0, 0, 0, 0);

    const endDate = new Date(date);
    endDate.setHours(23, 59, 59, 999);

    const bookings = await Booking.find({
      movie,
      theatre,
      date: {
        $gte: startDate,
        $lte: endDate,
      },
      showTime,
      status: "confirmed",
    });

    const bookedSeats = bookings.flatMap((booking) => booking.seats);

    res.status(200).json({
      message: "Booked seats fetched successfully.",
      bookedSeats,
    });
  } catch (error) {
    console.error("Get Booked Seats Error:", error);

    res.status(500).json({
      message: "Failed to fetch booked seats.",
      error: error.message,
    });
  }
});


/*
  CREATE BOOKING

  Login required.
*/
router.post("/", protect, async (req, res) => {
  try {
    const {
      movie,
      theatre,
      location,
      date,
      showTime,
      seats,
      ticketPrice,
      totalAmount,
    } = req.body;

    if (
      !movie ||
      !theatre ||
      !location ||
      !date ||
      !showTime ||
      !seats ||
      seats.length === 0 ||
      ticketPrice === undefined ||
      totalAmount === undefined
    ) {
      return res.status(400).json({
        message: "Please provide all booking details.",
      });
    }

    const movieExists = await Movie.findById(movie);

    if (!movieExists) {
      return res.status(404).json({
        message: "Movie not found.",
      });
    }

    const theatreExists = await Theatre.findById(theatre);

    if (!theatreExists) {
      return res.status(404).json({
        message: "Theatre not found.",
      });
    }

    const startDate = new Date(date);

    if (isNaN(startDate.getTime())) {
      return res.status(400).json({
        message: "Invalid booking date.",
      });
    }

    startDate.setHours(0, 0, 0, 0);

    const endDate = new Date(startDate);
    endDate.setHours(23, 59, 59, 999);

    /*
      Check whether any selected seat is already booked
      for the SAME movie + theatre + date + show time.
    */
    const existingBookings = await Booking.find({
      movie,
      theatre,
      date: {
        $gte: startDate,
        $lte: endDate,
      },
      showTime,
      status: "confirmed",
    });

    const alreadyBookedSeats = existingBookings.flatMap(
      (booking) => booking.seats
    );

    const conflictingSeats = seats.filter((seat) =>
      alreadyBookedSeats.includes(seat)
    );

    if (conflictingSeats.length > 0) {
      return res.status(409).json({
        message: "Some selected seats are already booked.",
        seats: conflictingSeats,
      });
    }

    /*
      Prevent duplicate seats inside the same request.
    */
    const uniqueSeats = [...new Set(seats)];

    if (uniqueSeats.length !== seats.length) {
      return res.status(400).json({
        message: "Duplicate seats are not allowed.",
      });
    }

    const booking = await Booking.create({
      user: req.user.id,
      movie,
      theatre,
      location,
      date: startDate,
      showTime,
      seats: uniqueSeats,
      ticketPrice,
      totalAmount,
      status: "confirmed",
    });

    const populatedBooking = await Booking.findById(booking._id)
      .populate("movie", "title genre language poster")
      .populate("theatre", "name location city");

    res.status(201).json({
      message: "Booking confirmed successfully.",
      booking: populatedBooking,
    });
  } catch (error) {
    console.error("Create Booking Error:", error);

    res.status(500).json({
      message: "Booking failed.",
      error: error.message,
    });
  }
});


/*
  GET MY BOOKINGS

  Login required.
*/
router.get("/my-bookings", protect, async (req, res) => {
  try {
    const bookings = await Booking.find({
      user: req.user.id,
    })
      .populate("movie", "title genre language poster rating")
      .populate("theatre", "name location city")
      .sort({ createdAt: -1 });

    res.status(200).json({
      message: "Bookings fetched successfully.",
      count: bookings.length,
      bookings,
    });
  } catch (error) {
    console.error("My Bookings Error:", error);

    res.status(500).json({
      message: "Failed to fetch bookings.",
      error: error.message,
    });
  }
});


/*
  GET SINGLE BOOKING

  Login required.
*/
router.get("/:id", protect, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate("movie", "title genre language poster rating")
      .populate("theatre", "name location city");

    if (!booking) {
      return res.status(404).json({
        message: "Booking not found.",
      });
    }

    /*
      User can only access their own booking.
    */
    if (booking.user.toString() !== req.user.id) {
      return res.status(403).json({
        message: "You are not allowed to view this booking.",
      });
    }

    res.status(200).json({
      message: "Booking fetched successfully.",
      booking,
    });
  } catch (error) {
    console.error("Get Booking Error:", error);

    res.status(500).json({
      message: "Failed to fetch booking.",
      error: error.message,
    });
  }
});


module.exports = router;
const dns = require("dns");
dns.setServers(["8.8.8.8", "1.1.1.1"]);

const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const profileRoutes = require("./routes/profileRoutes");
const movieRoutes = require("./routes/movieRoutes");
const theatreRoutes = require("./routes/theatreRoutes");
const locationRoutes = require("./routes/locationRoutes");
const showRoutes = require("./routes/showRoutes");
const bookingRoutes = require("./routes/bookingRoutes");

const app = express();

// ======================================================
// MIDDLEWARE
// ======================================================
app.use(cors());
app.use(express.json());

// ======================================================
// MONGODB CONNECTION
// ======================================================
connectDB();

// ======================================================
// AUTH ROUTES
// ======================================================
app.use("/api/auth", authRoutes);

// ======================================================
// USER PROFILE ROUTES
// ======================================================
app.use("/api/user", profileRoutes);

// ======================================================
// MOVIE ROUTES
// ======================================================
app.use("/api/movies", movieRoutes);

// ======================================================
// THEATRE ROUTES
// ======================================================
app.use("/api/theatres", theatreRoutes);

// ======================================================
// LOCATION ROUTES
// ======================================================
app.use("/api/locations", locationRoutes);

// ======================================================
// SHOW ROUTES
// ======================================================
app.use("/api/shows", showRoutes);

// ======================================================
// BOOKING ROUTES
// ======================================================
app.use("/api/bookings", bookingRoutes);

// ======================================================
// TEST ROUTE
// ======================================================
app.get("/", (req, res) => {
  res.json({
    message: "Movie Ticket Booking Backend is running successfully! 🎬",
  });
});

// ======================================================
// SERVER
// ======================================================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
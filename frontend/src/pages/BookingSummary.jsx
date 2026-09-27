import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

function BookingSummary() {
  const location = useLocation();
  const navigate = useNavigate();

  const booking = location.state;

  const [loading, setLoading] = useState(false);

  if (!booking) {
    return (
      <div className="booking-error">
        <h2>Booking Details Not Found</h2>

        <p>
          Please select a movie and seats again.
        </p>

        <button
          onClick={() => navigate("/movies")}
          className="back-btn"
        >
          ← Back to Movies
        </button>
      </div>
    );
  }

  const {
    movie,
    movieObjectId,
    seats,
    theatre,
    theatreId,
    theatreLocation,
    date,
    showTime,
    ticketPrice,
  } = booking;

  // ======================================================
  // CONFIRM BOOKING
  // ======================================================
  const handleConfirmBooking = async () => {
    // Prevent multiple clicks
    if (loading) {
      return;
    }

    // Check booking details
    if (
      !movieObjectId ||
      !theatreId ||
      !date ||
      !showTime ||
      !seats ||
      seats.length === 0
    ) {
      alert(
        "Booking details are incomplete. Please select the show and seats again."
      );
      return;
    }

    // Check login
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login before confirming your booking.");
      navigate("/login");
      return;
    }

    try {
      setLoading(true);

      const response = await axios.post(
        "http://localhost:5000/api/bookings",
        {
          movie: movieObjectId,
          theatre: theatreId,
          location: theatreLocation,
          date,
          showTime,
          seats,
          ticketPrice,
          totalAmount: ticketPrice,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Booking successfully created
      if (response.status === 201) {
        const createdBooking =
          response.data.booking;

        alert(
          `Booking confirmed successfully! 🎉\n\nBooking ID: ${
            createdBooking?._id || "Confirmed"
          }`
        );

        navigate("/bookings");
      }
    } catch (error) {
      console.error(
        "Confirm Booking Error:",
        error
      );

      // If seat conflict occurs
      if (error.response?.status === 409) {
        const bookedSeats =
          error.response?.data?.seats || [];

        if (bookedSeats.length > 0) {
          alert(
            `These seats are already booked: ${bookedSeats.join(
              ", "
            )}\n\nPlease go back and select different seats.`
          );
        } else {
          alert(
            "Some selected seats are already booked. Please select different seats."
          );
        }

        return;
      }

      const message =
        error.response?.data?.message ||
        "Booking failed. Please try again.";

      alert(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="booking-summary-page">

      {/* HEADER */}
      <div className="booking-summary-header">

        <span>BOOKING SUMMARY</span>

        <h1>Review Your Booking</h1>

        <p>
          Check your booking details before confirmation.
        </p>

      </div>

      {/* BOOKING CARD */}
      <div className="booking-card">

        {/* MOVIE SECTION */}
        <div className="booking-movie-section">

          <img
            src={movie.poster}
            alt={movie.title}
            className="booking-movie-poster"
          />

          <div className="booking-movie-info">

            <h2>{movie.title}</h2>

            <p>{movie.genre}</p>

            <div className="booking-rating">
              ⭐ {movie.rating}
            </div>

          </div>

        </div>

        {/* BOOKING DETAILS */}
        <div className="booking-details">

          <div className="booking-detail-item">
            <span>🎬 Theatre</span>

            <strong>{theatre}</strong>
          </div>

          <div className="booking-detail-item">
            <span>📍 Location</span>

            <strong>{theatreLocation}</strong>
          </div>

          <div className="booking-detail-item">
            <span>📅 Date</span>

            <strong>{date}</strong>
          </div>

          <div className="booking-detail-item">
            <span>🕐 Show Time</span>

            <strong>{showTime}</strong>
          </div>

        </div>

        {/* SEATS */}
        <div className="booking-seats-section">

          <h3>💺 Selected Seats</h3>

          <div className="booking-seat-list">

            {seats.map((seat) => (
              <span key={seat}>
                {seat}
              </span>
            ))}

          </div>

        </div>

        {/* PRICE */}
        <div className="booking-price-section">

          <div className="price-row">
            <span>Total Seats</span>

            <strong>
              {seats.length}
            </strong>
          </div>

          <div className="price-row">
            <span>Ticket Amount</span>

            <strong>
              ₹{ticketPrice}
            </strong>
          </div>

          <div className="price-row total-row">
            <span>Total Amount</span>

            <strong>
              ₹{ticketPrice}
            </strong>
          </div>

        </div>

        {/* ACTIONS */}
        <div className="booking-actions">

          <button
            className="back-booking-btn"
            onClick={() => navigate(-1)}
            disabled={loading}
          >
            ← Back
          </button>

          <button
            className="confirm-booking-btn"
            onClick={handleConfirmBooking}
            disabled={loading}
          >
            {loading
              ? "Confirming Booking..."
              : "Confirm Booking 🎟️"}
          </button>

        </div>

      </div>

    </div>
  );
}

export default BookingSummary;
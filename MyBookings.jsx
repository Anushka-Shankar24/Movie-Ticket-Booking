import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import movies from "../data/movies";
import "./TicketModal.css";

function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedTicket, setSelectedTicket] = useState(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          setError("Please login to view your bookings.");
          setLoading(false);
          return;
        }

        const response = await axios.get(
          "http://localhost:5000/api/bookings/my-bookings",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setBookings(response.data.bookings || []);
      } catch (error) {
        console.error("Fetch Bookings Error:", error);

        if (error.response?.status === 401) {
          setError(
            "Your session has expired. Please login again."
          );
        } else {
          setError(
            error.response?.data?.message ||
              "Unable to load your bookings."
          );
        }
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  // ============================
  // FORMAT DATE
  // ============================
  const formatBookingDate = (date) => {
    if (!date) return "Not available";

    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "long",
      year: "numeric",
      timeZone: "Asia/Kolkata",
    });
  };

  // ============================
  // GET MOVIE POSTER
  // ============================
  const getMoviePoster = (movie) => {
    const movieTitle =
      typeof movie === "string"
        ? movie
        : movie?.title;

    const localMovie = movies.find(
      (item) =>
        item.title.toLowerCase() ===
        movieTitle?.toLowerCase()
    );

    return localMovie?.poster || "";
  };

  // ============================
  // CLOSE TICKET
  // ============================
  const closeTicket = () => {
    setSelectedTicket(null);
  };

  // ============================
  // LOADING
  // ============================
  if (loading) {
    return (
      <div className="bookings-page">
        <section className="bookings-header">
          <span>MY BOOKINGS</span>

          <h1>🎟️ My Movie Bookings</h1>

          <p>
            View and manage your movie ticket bookings.
          </p>
        </section>

        <section className="bookings-container">
          <div className="no-bookings">
            <div className="no-bookings-icon">
              🎟️
            </div>

            <h2>Loading Bookings...</h2>

            <p>
              Please wait while we fetch your bookings.
            </p>
          </div>
        </section>
      </div>
    );
  }

  // ============================
  // ERROR
  // ============================
  if (error) {
    return (
      <div className="bookings-page">
        <section className="bookings-header">
          <span>MY BOOKINGS</span>

          <h1>🎟️ My Movie Bookings</h1>

          <p>
            View and manage your movie ticket bookings.
          </p>
        </section>

        <section className="bookings-container">
          <div className="no-bookings">
            <div className="no-bookings-icon">
              ⚠️
            </div>

            <h2>Unable to Load Bookings</h2>

            <p>{error}</p>

            <Link
              to="/login"
              className="browse-movies-btn"
            >
              Go to Login
            </Link>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="bookings-page">

      {/* HEADER */}
      <section className="bookings-header">
        <span>MY BOOKINGS</span>

        <h1>🎟️ My Movie Bookings</h1>

        <p>
          View and manage your movie ticket bookings.
        </p>
      </section>

      {/* BOOKINGS */}
      <section className="bookings-container">

        {bookings.length > 0 ? (
          bookings.map((booking) => {

            const movieTitle =
              booking.movie?.title ||
              "Movie";

            const poster =
              getMoviePoster(booking.movie);

            const theatreName =
              booking.theatre?.name ||
              "Theatre";

            const theatreLocation =
              booking.theatre?.location ||
              booking.location ||
              "Location not available";

            const bookingStatus =
              booking.status
                ? booking.status.charAt(0).toUpperCase() +
                  booking.status.slice(1)
                : "Confirmed";

            return (
              <div
                className="booking-history-card"
                key={booking._id}
              >

                {/* MOVIE */}
                <div className="booking-history-movie">

                  {poster ? (
                    <img
                      src={poster}
                      alt={movieTitle}
                    />
                  ) : (
                    <div className="booking-poster-placeholder">
                      🎬
                    </div>
                  )}

                  <div>
                    <h2>{movieTitle}</h2>

                    <span className="booking-status">
                      ✓ {bookingStatus}
                    </span>
                  </div>

                </div>

                {/* DETAILS */}
                <div className="booking-history-details">

                  <div>
                    <span>🎬 Theatre</span>

                    <strong>
                      {theatreName}
                    </strong>
                  </div>

                  <div>
                    <span>📍 Location</span>

                    <strong>
                      {theatreLocation}
                    </strong>
                  </div>

                  <div>
                    <span>📅 Date</span>

                    <strong>
                      {formatBookingDate(
                        booking.date
                      )}
                    </strong>
                  </div>

                  <div>
                    <span>🕐 Show Time</span>

                    <strong>
                      {booking.showTime ||
                        "Not available"}
                    </strong>
                  </div>

                  <div>
                    <span>💺 Seats</span>

                    <strong>
                      {booking.seats?.length > 0
                        ? booking.seats.join(", ")
                        : "Not available"}
                    </strong>
                  </div>

                  <div>
                    <span>💰 Amount</span>

                    <strong>
                      ₹
                      {booking.totalAmount ??
                        booking.ticketPrice ??
                        0}
                    </strong>
                  </div>

                </div>

                {/* BOOKING ID */}
                <div className="booking-history-footer">

                  <span>
                    Booking ID:{" "}
                    <strong>
                      {booking._id}
                    </strong>
                  </span>

                  <button
                    className="view-ticket-btn"
                    type="button"
                    onClick={() =>
                      setSelectedTicket(booking)
                    }
                  >
                    View Ticket 🎟️
                  </button>

                </div>

              </div>
            );
          })
        ) : (

          /* EMPTY STATE */
          <div className="no-bookings">

            <div className="no-bookings-icon">
              🎟️
            </div>

            <h2>No Bookings Yet</h2>

            <p>
              You haven't booked any movie tickets yet.
            </p>

            <Link
              to="/movies"
              className="browse-movies-btn"
            >
              Browse Movies 🎬
            </Link>

          </div>

        )}

      </section>

      {/* ==================================================
          DIGITAL TICKET MODAL
         ================================================== */}

      {selectedTicket && (
        <div
          className="ticket-modal-overlay"
          onClick={closeTicket}
        >

          <div
            className="ticket-modal"
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            {/* CLOSE BUTTON */}
            <button
              className="ticket-close-btn"
              onClick={closeTicket}
              type="button"
            >
              ✕
            </button>

            {/* TICKET HEADER */}
            <div className="ticket-header">

              <div className="ticket-logo">
                🎬
              </div>

              <div>
                <span>MOVIEBOOK</span>

                <h2>Movie Ticket</h2>
              </div>

            </div>

            {/* MOVIE */}
            <div className="ticket-movie">

              {getMoviePoster(
                selectedTicket.movie
              ) ? (
                <img
                  src={getMoviePoster(
                    selectedTicket.movie
                  )}
                  alt={
                    selectedTicket.movie?.title ||
                    "Movie"
                  }
                />
              ) : (
                <div className="ticket-poster-placeholder">
                  🎬
                </div>
              )}

              <div>

                <h2>
                  {selectedTicket.movie?.title ||
                    "Movie"}
                </h2>

                <span>
                  {selectedTicket.movie?.genre ||
                    "Movie"}
                </span>

              </div>

            </div>

            {/* DIVIDER */}
            <div className="ticket-divider">
              <span></span>
              <span></span>
            </div>

            {/* TICKET DETAILS */}
            <div className="ticket-details">

              <div>
                <span>🎬 Theatre</span>

                <strong>
                  {selectedTicket.theatre?.name ||
                    "Theatre"}
                </strong>
              </div>

              <div>
                <span>📍 Location</span>

                <strong>
                  {selectedTicket.theatre?.location ||
                    selectedTicket.location ||
                    "Not available"}
                </strong>
              </div>

              <div>
                <span>📅 Date</span>

                <strong>
                  {formatBookingDate(
                    selectedTicket.date
                  )}
                </strong>
              </div>

              <div>
                <span>🕐 Show Time</span>

                <strong>
                  {selectedTicket.showTime ||
                    "Not available"}
                </strong>
              </div>

              <div>
                <span>💺 Seats</span>

                <strong>
                  {selectedTicket.seats?.join(
                    ", "
                  ) || "Not available"}
                </strong>
              </div>

              <div>
                <span>🎟️ Status</span>

                <strong className="ticket-confirmed">
                  ✓ Confirmed
                </strong>
              </div>

            </div>

            {/* AMOUNT */}
            <div className="ticket-amount">

              <span>Total Amount</span>

              <strong>
                ₹
                {selectedTicket.totalAmount ??
                  selectedTicket.ticketPrice ??
                  0}
              </strong>

            </div>

            {/* BOOKING ID */}
            <div className="ticket-booking-id">

              <span>Booking ID</span>

              <strong>
                {selectedTicket._id}
              </strong>

            </div>

            {/* FOOTER */}
            <div className="ticket-footer">

              <p>
                Thank you for booking with MovieBook 🎬
              </p>

            </div>

          </div>

        </div>
      )}

    </div>
  );
}

export default MyBookings;
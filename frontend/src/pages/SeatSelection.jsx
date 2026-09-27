import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import movies from "../data/movies";
import "./SeatSelection.css";

const seatRows = [
  { category: "NORMAL", price: 160, rows: ["A"] },
  { category: "EXECUTIVE", price: 240, rows: ["B", "C", "D"] },
  {
    category: "PREMIUM",
    price: 300,
    rows: ["E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O"],
  },
  {
    category: "RECLINER",
    price: 660,
    rows: ["P"],
  },
];

const seatsPerRow = 20;

function SeatSelection() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const movie = movies.find(
    (item) => item.id === Number(id)
  );

  const [selectedSeats, setSelectedSeats] = useState([]);
  const [occupiedSeats, setOccupiedSeats] = useState([]);

  const {
    theatre = "PVR Cinemas",
    theatreId = "",
    theatreLocation = "Patna Central Mall",
    date = "",
    showTime = "",
    movieObjectId = "",
    showId = "",
  } = location.state || {};

  // Fetch real booked seats
  useEffect(() => {
    const fetchBookedSeats = async () => {
      try {
        if (
          !movieObjectId ||
          !theatreId ||
          !date ||
          !showTime
        ) {
          setOccupiedSeats([]);
          return;
        }

        const response = await axios.get(
          `http://localhost:5000/api/bookings/seats?movie=${movieObjectId}&theatre=${theatreId}&date=${date}&showTime=${encodeURIComponent(
            showTime
          )}`
        );

        /*
          Current requirement:
          Previous booking should remain in Booking History.
          Current seat screen should start fresh.
        */

        setOccupiedSeats([]);
      } catch (error) {
        console.error(
          "Fetch Booked Seats Error:",
          error
        );

        setOccupiedSeats([]);
      }
    };

    fetchBookedSeats();
  }, [
    movieObjectId,
    theatreId,
    date,
    showTime,
  ]);

  // Get price according to row
  const getSeatPrice = (row) => {
    for (const section of seatRows) {
      if (section.rows.includes(row)) {
        return section.price;
      }
    }

    return 0;
  };

  // Toggle seat
  const toggleSeat = (seatId) => {
    if (occupiedSeats.includes(seatId)) {
      return;
    }

    setSelectedSeats((previousSeats) => {
      if (previousSeats.includes(seatId)) {
        return previousSeats.filter(
          (seat) => seat !== seatId
        );
      }

      return [...previousSeats, seatId];
    });
  };

  // Total price
  const getTotalPrice = () => {
    return selectedSeats.reduce(
      (total, seatId) => {
        const row = seatId.charAt(0);

        return total + getSeatPrice(row);
      },
      0
    );
  };

  // Proceed
  const handleProceed = () => {
    if (selectedSeats.length === 0) {
      alert("Please select at least one seat.");
      return;
    }

    if (
      !date ||
      !showTime ||
      !movieObjectId ||
      !theatreId
    ) {
      alert(
        "Show details are missing. Please select the show again."
      );
      return;
    }

    const bookingData = {
      movie,
      movieObjectId,
      seats: selectedSeats,
      theatre,
      theatreId,
      theatreLocation,
      date,
      showTime,
      showId,
      ticketPrice: getTotalPrice(),
    };

    navigate("/booking-summary", {
      state: bookingData,
    });
  };

  if (!movie) {
    return (
      <div className="seat-page-error">
        <h2>Movie Not Found</h2>

        <button
          onClick={() => navigate("/movies")}
        >
          Back to Movies
        </button>
      </div>
    );
  }

  return (
    <div className="seat-selection-page">

      {/* TOP MOVIE INFORMATION */}
      <div className="seat-top-card">

        <div className="seat-movie-info">

          <img
            src={movie.poster}
            alt={movie.title}
            className="seat-movie-poster"
          />

          <div>
            <h2>{movie.title}</h2>

            <p>
              {movie.language} • {movie.genre}
              {" • "}
              {movie.duration}
            </p>
          </div>

        </div>

        <div className="seat-show-info">

          <div>
            <span>📅</span>

            <div>
              <small>Date</small>
              <strong>{date}</strong>
            </div>
          </div>

          <div>
            <span>🕐</span>

            <div>
              <small>Time</small>
              <strong>{showTime}</strong>
            </div>
          </div>

          <div>
            <span>📍</span>

            <div>
              <small>Theatre</small>
              <strong>{theatre}</strong>
              <small>{theatreLocation}</small>
            </div>
          </div>

        </div>
      </div>

      <div className="seat-main-layout">

        {/* SEAT AREA */}
        <div className="seat-map-container">

          {/* SCREEN */}
          <div className="screen-area">
            <div className="screen-shape">
              SCREEN
            </div>
          </div>

          {/* SEAT SECTIONS */}
          {seatRows.map((section) => (
            <div
              className="seat-section"
              key={section.category}
            >

              <div className="seat-category-title">

                <span></span>

                <h3>
                  {section.category}
                  {" "}
                  <b>₹{section.price}</b>
                </h3>

                <span></span>

              </div>

              {section.rows.map((row) => (

                <div
                  className="seat-row"
                  key={row}
                >

                  <div className="row-name">
                    {row}
                  </div>

                  <div className="seat-group">

                    {/* LEFT 10 */}
                    <div className="seat-half">

                      {Array.from(
                        {
                          length: 10,
                        },
                        (_, index) => {

                          const seatNumber =
                            index + 1;

                          const seatId =
                            `${row}${seatNumber}`;

                          const isSelected =
                            selectedSeats.includes(
                              seatId
                            );

                          const isOccupied =
                            occupiedSeats.includes(
                              seatId
                            );

                          return (
                            <button
                              key={seatId}
                              className={`cinema-seat ${
                                isSelected
                                  ? "selected"
                                  : ""
                              } ${
                                isOccupied
                                  ? "occupied"
                                  : ""
                              }`}
                              onClick={() =>
                                toggleSeat(
                                  seatId
                                )
                              }
                              disabled={
                                isOccupied
                              }
                              title={seatId}
                            >
                              <span className="seat-icon">
                                💺
                              </span>

                              <span className="seat-number">
                                {seatNumber}
                              </span>
                            </button>
                          );
                        }
                      )}

                    </div>

                    {/* AISLE */}
                    <div className="seat-aisle"></div>

                    {/* RIGHT 10 */}
                    <div className="seat-half">

                      {Array.from(
                        {
                          length: 10,
                        },
                        (_, index) => {

                          const seatNumber =
                            index + 11;

                          const seatId =
                            `${row}${seatNumber}`;

                          const isSelected =
                            selectedSeats.includes(
                              seatId
                            );

                          const isOccupied =
                            occupiedSeats.includes(
                              seatId
                            );

                          return (
                            <button
                              key={seatId}
                              className={`cinema-seat ${
                                isSelected
                                  ? "selected"
                                  : ""
                              } ${
                                isOccupied
                                  ? "occupied"
                                  : ""
                              }`}
                              onClick={() =>
                                toggleSeat(
                                  seatId
                                )
                              }
                              disabled={
                                isOccupied
                              }
                              title={seatId}
                            >
                              <span className="seat-icon">
                                💺
                              </span>

                              <span className="seat-number">
                                {seatNumber}
                              </span>
                            </button>
                          );
                        }
                      )}

                    </div>

                  </div>

                </div>

              ))}

            </div>
          ))}

        </div>

        {/* BOOKING SUMMARY */}
        <div className="seat-booking-card">

          <div className="booking-card-title">
            <span>🎟️</span>
            <h2>Booking Summary</h2>
          </div>

          <div className="booking-detail">
            <span>🎬</span>

            <div>
              <small>Movie</small>
              <strong>{movie.title}</strong>
            </div>
          </div>

          <div className="booking-detail">
            <span>📍</span>

            <div>
              <small>Theatre</small>
              <strong>{theatre}</strong>
              <p>{theatreLocation}</p>
            </div>
          </div>

          <div className="booking-detail">
            <span>📅</span>

            <div>
              <small>Date</small>
              <strong>{date}</strong>
            </div>
          </div>

          <div className="booking-detail">
            <span>🕐</span>

            <div>
              <small>Time</small>
              <strong>{showTime}</strong>
            </div>
          </div>

          <div className="booking-divider"></div>

          {/* LEGEND */}
          <div className="seat-legend">

            <div>
              <span className="legend-seat available"></span>
              Available
            </div>

            <div>
              <span className="legend-seat selected"></span>
              Selected
            </div>

            <div>
              <span className="legend-seat occupied"></span>
              Booked
            </div>

          </div>

          {/* SELECTED SEATS */}
          {selectedSeats.length > 0 && (
            <div className="selected-seat-box">

              <div>
                <span>Selected Seats</span>

                <strong>
                  {selectedSeats.join(", ")}
                </strong>
              </div>

              <div>
                <span>Total</span>

                <strong>
                  ₹{getTotalPrice()}
                </strong>
              </div>

            </div>
          )}

          <button
            className="proceed-booking-btn"
            onClick={handleProceed}
          >
            Proceed to Book
            <span>→</span>
          </button>

        </div>

      </div>

      <div className="seat-footer">
        Enjoy the Movie
        <span>•</span>
        For a Better Tomorrow
      </div>

    </div>
  );
}

export default SeatSelection;
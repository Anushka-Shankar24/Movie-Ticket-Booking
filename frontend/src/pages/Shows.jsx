import { Link, useParams, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import movies from "../data/movies";

function Shows() {
  const { id } = useParams();
  const location = useLocation();

  const movie = movies.find(
    (item) => item.id === Number(id)
  );

  const [selectedDate, setSelectedDate] = useState(
    new Date()
  );

  const [shows, setShows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const selectedCity = location.state?.city || "Patna";

  // Get today + next 3 days
  const getNextDates = () => {
    const dates = [];

    for (let i = 0; i < 4; i++) {
      const date = new Date();

      date.setDate(
        date.getDate() + i
      );

      dates.push(date);
    }

    return dates;
  };

  const dates = getNextDates();

  // Convert date to YYYY-MM-DD
  const formatDateForAPI = (date) => {
    const year = date.getFullYear();

    const month = String(
      date.getMonth() + 1
    ).padStart(2, "0");

    const day = String(
      date.getDate()
    ).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  // Date button label
  const getDateLabel = (date, index) => {
    if (index === 0) {
      return "Today";
    }

    if (index === 1) {
      return "Tomorrow";
    }

    return date.toLocaleDateString(
      "en-US",
      {
        weekday: "long",
      }
    );
  };

  // Fetch shows for selected date
  useEffect(() => {
    if (!movie) return;

    const fetchShows = async () => {
      try {
        setLoading(true);
        setError("");
        setShows([]);

        // -----------------------------------------
        // 1. GET ALL MOVIES FROM BACKEND
        // -----------------------------------------

        const movieResponse =
          await axios.get(
            "http://localhost:5000/api/movies"
          );

        const backendMovies =
          movieResponse.data.movies || [];

        // Find current movie
        const backendMovie =
          backendMovies.find(
            (item) =>
              item.title.toLowerCase() ===
              movie.title.toLowerCase()
          );

        if (!backendMovie) {
          setError(
            "Movie not found in backend."
          );

          setShows([]);

          return;
        }

        // -----------------------------------------
        // 2. SELECTED DATE
        // -----------------------------------------

        const selectedDateString =
          formatDateForAPI(
            selectedDate
          );

        // -----------------------------------------
        // 3. GET SHOWS FOR THIS MOVIE + DATE
        // -----------------------------------------

        const response =
          await axios.get(
            `http://localhost:5000/api/shows/movie/${backendMovie._id}/date/${selectedDateString}`
          );

        const dateShows =
          response.data.shows || [];

        // -----------------------------------------
        // 4. NO SHOWS
        // -----------------------------------------

        if (dateShows.length === 0) {
          setShows([]);

          setError(
            "No shows available for this date."
          );

          return;
        }

        // -----------------------------------------
        // 5. FORMAT SHOW DATA
        // -----------------------------------------

        const formattedShows =
          dateShows.map((show) => ({
            ...show,

            movieObjectId:
              backendMovie._id,

            theatreId:
              show.theatre?._id || "",

            theatre:
              show.theatre,

            showId:
              show._id,

            date:
              selectedDateString,
          }));

        setShows(formattedShows);
      } catch (error) {
        console.error(
          "Fetch Shows Error:",
          error
        );

        setShows([]);

        setError(
          "Unable to fetch shows."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchShows();
  }, [selectedDate, movie]);

  // -----------------------------------------
  // MOVIE NOT FOUND
  // -----------------------------------------

  if (!movie) {
    return (
      <div className="not-found">

        <h2>
          Movie Not Found
        </h2>

        <Link
          to="/movies"
          className="back-btn"
        >
          ← Back to Movies
        </Link>

      </div>
    );
  }

  // -----------------------------------------
  // GROUP SHOWS BY THEATRE
  // -----------------------------------------

  const groupedShows =
    shows.reduce(
      (groups, show) => {
        const theatreName =
          show.theatre?.name ||
          "Theatre";

        if (!groups[theatreName]) {
          groups[theatreName] = {
            theatre:
              theatreName,

            theatreId:
              show.theatre?._id ||
              show.theatreId ||
              "",

            location:
              show.theatre?.location ||
              show.location ||
              selectedCity,

            movieObjectId:
              show.movieObjectId ||
              show.movie?._id ||
              "",

            times: [],

            showIds: [],
          };
        }

        // Prevent duplicate timings
        if (
          !groups[
            theatreName
          ].times.includes(show.time)
        ) {
          groups[
            theatreName
          ].times.push(show.time);

          groups[
            theatreName
          ].showIds.push(show._id);
        }

        return groups;
      },
      {}
    );

  const theatreList =
    Object.values(
      groupedShows
    );

  return (
    <div className="shows-page">

      {/* HEADER */}

      <div className="shows-header">

        <div>

          <span className="shows-label">
            SELECT SHOW
          </span>

          <h1>
            {movie.title}
          </h1>

          <p>
            {movie.language} •{" "}
            {movie.genre}
          </p>

        </div>

        <div className="shows-movie-info">

          <span>
            ⭐ {movie.rating}
          </span>

          <span>
            🎬 {movie.language}
          </span>

        </div>

      </div>

      {/* DATE SELECTION */}

      <div className="date-selection">

        <h2>
          Select Date
        </h2>

        <div className="date-list">

          {dates.map(
            (date, index) => {

              const isSelected =
                formatDateForAPI(
                  date
                ) ===
                formatDateForAPI(
                  selectedDate
                );

              return (
                <button
                  key={formatDateForAPI(
                    date
                  )}
                  className={`date-card ${
                    isSelected
                      ? "active"
                      : ""
                  }`}
                  onClick={() =>
                    setSelectedDate(
                      date
                    )
                  }
                >

                  <span className="date-label">
                    {getDateLabel(
                      date,
                      index
                    )}
                  </span>

                  <span className="date-number">
                    {date.getDate()}
                  </span>

                  <span className="date-month">
                    {date.toLocaleDateString(
                      "en-US",
                      {
                        month: "short",
                      }
                    )}
                  </span>

                </button>
              );
            }
          )}

        </div>

      </div>

      {/* THEATRES */}

      <div className="theatre-section">

        <div className="section-heading">

          <h2>
            Theatres in{" "}
            {selectedCity}
          </h2>

        </div>

        {/* LOADING */}

        {loading && (
          <div className="shows-message">

            <p>
              Loading shows...
            </p>

          </div>
        )}

        {/* ERROR */}

        {!loading &&
          error && (
            <div className="shows-message error-message">

              <p>
                {error}
              </p>

            </div>
          )}

        {/* NO SHOWS */}

        {!loading &&
          !error &&
          theatreList.length === 0 && (
            <div className="shows-message">

              <h3>
                No shows available
              </h3>

              <p>
                No shows are available
                for this date.
              </p>

            </div>
          )}

        {/* THEATRE LIST */}

        {!loading &&
          !error &&
          theatreList.map(
            (show) => (
              <div
                className="theatre-card"
                key={
                  show.theatreId ||
                  show.theatre
                }
              >

                {/* THEATRE INFO */}

                <div className="theatre-info">

                  <h3>
                    {show.theatre}
                  </h3>

                  <p>
                    📍{" "}
                    {show.location}
                  </p>

                </div>

                {/* SHOW TIMES */}

                <div className="show-times">

                  {show.times.map(
                    (
                      time,
                      index
                    ) => (
                      <Link
                        key={`${time}-${index}`}
                        to={`/seats/${movie.id}`}
                        state={{
                          movieId:
                            movie.id,

                          movieTitle:
                            movie.title,

                          movieObjectId:
                            show.movieObjectId,

                          theatre:
                            show.theatre,

                          theatreId:
                            show.theatreId,

                          location:
                            selectedCity,

                          theatreLocation:
                            show.location,

                          date:
                            formatDateForAPI(
                              selectedDate
                            ),

                          showTime:
                            time,

                          showId:
                            show.showIds[
                              index
                            ],
                        }}
                        className="show-time"
                      >
                        {time}
                      </Link>
                    )
                  )}

                </div>

              </div>
            )
          )}

      </div>

    </div>
  );
}

export default Shows;
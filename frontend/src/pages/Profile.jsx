import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function Profile() {
  const [user, setUser] = useState(null);

  const [bookingStats, setBookingStats] = useState({
    totalBookings: 0,
    upcomingShows: 0,
    moviesWatched: 0,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          setError("Please login first.");
          setLoading(false);
          return;
        }

        // ==========================================
        // FETCH PROFILE
        // ==========================================

        const profileResponse = await axios.get(
          "http://localhost:5000/api/user/profile",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const profileUser =
          profileResponse.data.user ||
          profileResponse.data;

        setUser(profileUser);

        // ==========================================
        // FETCH BOOKINGS
        // ==========================================

        const bookingsResponse = await axios.get(
          "http://localhost:5000/api/bookings/my-bookings",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const bookings =
          bookingsResponse.data.bookings || [];

        // ==========================================
        // TOTAL BOOKINGS
        // ==========================================

        const totalBookings = bookings.length;

        // ==========================================
        // TODAY
        // ==========================================

        const today = new Date();

        today.setHours(0, 0, 0, 0);

        // ==========================================
        // UPCOMING SHOWS
        // ==========================================

        const upcomingBookings = bookings.filter(
          (booking) => {
            if (!booking.date) return false;

            const bookingDate =
              new Date(booking.date);

            bookingDate.setHours(0, 0, 0, 0);

            return (
              bookingDate >= today &&
              booking.status !== "cancelled"
            );
          }
        );

        const upcomingShows =
          upcomingBookings.length;

        // ==========================================
        // MOVIES WATCHED
        // ==========================================

        const watchedMovieIds = new Set();

        bookings.forEach((booking) => {
          if (!booking.date) return;

          const bookingDate =
            new Date(booking.date);

          bookingDate.setHours(0, 0, 0, 0);

          if (
            bookingDate < today &&
            booking.status !== "cancelled"
          ) {
            const movieId =
              booking.movie?._id ||
              booking.movie;

            if (movieId) {
              watchedMovieIds.add(
                movieId.toString()
              );
            }
          }
        });

        const moviesWatched =
          watchedMovieIds.size;

        // ==========================================
        // SET BOOKING STATS
        // ==========================================

        setBookingStats({
          totalBookings,
          upcomingShows,
          moviesWatched,
        });

      } catch (error) {
        console.error(
          "Profile Data Error:",
          error
        );

        if (error.response?.status === 401) {
          setError(
            "Your session has expired. Please login again."
          );
        } else {
          setError(
            error.response?.data?.message ||
              "Unable to load profile."
          );
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, []);

  // ==========================================
  // LOADING STATE
  // ==========================================

  if (loading) {
    return (
      <div className="profile-page">
        <div className="profile-container">
          <div className="profile-card">

            <h2>Loading Profile...</h2>

            <p>
              Please wait.
            </p>

          </div>
        </div>
      </div>
    );
  }

  // ==========================================
  // ERROR STATE
  // ==========================================

  if (error) {
    return (
      <div className="profile-page">
        <div className="profile-container">

          <div className="profile-card">

            <h2>Profile Error</h2>

            <p>{error}</p>

            <Link
              to="/login"
              className="profile-action"
            >
              Go to Login
            </Link>

          </div>

        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="profile-page">

      {/* ==========================================
          PROFILE HEADER
      ========================================== */}

      <div className="profile-header">

        <div className="profile-avatar">
          {user.name
            ?.charAt(0)
            .toUpperCase()}
        </div>

        <div>

          <h1>{user.name}</h1>

          <p>
            MovieBook Member
          </p>

        </div>

      </div>

      <div className="profile-container">

        {/* ==========================================
            PERSONAL INFORMATION
        ========================================== */}

        <section className="profile-card">

          <div className="profile-card-header">

            <h2>
              👤 Personal Information
            </h2>

            <button
              className="edit-profile-btn"
              type="button"
              onClick={() =>
                alert(
                  "Edit Profile feature coming soon."
                )
              }
            >
              Edit Profile
            </button>

          </div>

          <div className="profile-details">

            <div className="profile-detail">

              <span>
                Full Name
              </span>

              <strong>
                {user.name ||
                  "Not available"}
              </strong>

            </div>

            <div className="profile-detail">

              <span>
                Email Address
              </span>

              <strong>
                {user.email ||
                  "Not available"}
              </strong>

            </div>

            <div className="profile-detail">

              <span>
                Phone Number
              </span>

              <strong>
                Not added
              </strong>

            </div>

          </div>

        </section>

        {/* ==========================================
            BOOKING ACTIVITY
        ========================================== */}

        <section className="profile-card">

          <h2>
            🎟️ Booking Activity
          </h2>

          <div className="profile-stats">

            <div className="profile-stat">

              <strong>
                {bookingStats.totalBookings}
              </strong>

              <span>
                Total Bookings
              </span>

            </div>

            <div className="profile-stat">

              <strong>
                {bookingStats.upcomingShows}
              </strong>

              <span>
                Upcoming Shows
              </span>

            </div>

            <div className="profile-stat">

              <strong>
                {bookingStats.moviesWatched}
              </strong>

              <span>
                Movies Watched
              </span>

            </div>

          </div>

        </section>

        {/* ==========================================
            QUICK ACTIONS
        ========================================== */}

        <section className="profile-card profile-links-card">

          <h2>
            Quick Actions
          </h2>

          <div className="profile-actions">

            <Link
              to="/bookings"
              className="profile-action"
            >

              <span className="profile-action-icon">
                🎟️
              </span>

              <div>

                <strong>
                  My Bookings
                </strong>

                <span>
                  View your booked tickets
                </span>

              </div>

            </Link>

            <Link
              to="/movies"
              className="profile-action"
            >

              <span className="profile-action-icon">
                🎬
              </span>

              <div>

                <strong>
                  Browse Movies
                </strong>

                <span>
                  Explore movies and book tickets
                </span>

              </div>

            </Link>

            <Link
              to="/"
              className="profile-action"
            >

              <span className="profile-action-icon">
                🏠
              </span>

              <div>

                <strong>
                  Home
                </strong>

                <span>
                  Go back to MovieBook home
                </span>

              </div>

            </Link>

          </div>

        </section>

      </div>

    </div>
  );
}

export default Profile;
import { Link } from "react-router-dom";
import movies from "../data/movies";
import MovieCard from "../components/MovieCard";

function Home() {
  return (
    <div className="home">

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">

          <h1>
            Book Your Movie
            <span> Experience</span>
          </h1>

          <p>
            Discover the latest movies, choose your favorite
            theatre and book your seats easily.
          </p>

          <div className="hero-buttons">

            <Link to="/movies" className="hero-btn">
              Explore Movies 🎬
            </Link>

            <Link to="/location" className="location-btn">
              📍 Select Location
            </Link>

          </div>

        </div>
      </section>

      {/* Popular Movies */}
      <section className="section">
        <div className="section-header">

          <h2>Popular Movies</h2>

          <Link to="/movies" className="see-all">
            View All →
          </Link>

        </div>

        <div className="movie-grid">

          {movies.slice(0, 4).map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
            />
          ))}

        </div>
      </section>

      {/* Features */}
      <section className="features-section">

        <h2>Why Choose MovieBook?</h2>

        <div className="features">

          <div className="feature-card">
            <div className="feature-icon">🎬</div>

            <h3>Latest Movies</h3>

            <p>
              Explore the latest and most popular movies
              available in theatres.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">💺</div>

            <h3>Easy Seat Selection</h3>

            <p>
              Select your preferred seats with our simple
              and interactive seat layout.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🔒</div>

            <h3>Secure Booking</h3>

            <p>
              Enjoy a simple and secure movie ticket
              booking experience.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">📱</div>

            <h3>Digital Tickets</h3>

            <p>
              Access your booking details and tickets
              from your account.
            </p>
          </div>

        </div>

      </section>

    </div>
  );
}

export default Home;
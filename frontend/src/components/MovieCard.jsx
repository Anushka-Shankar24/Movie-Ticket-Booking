import { Link } from "react-router-dom";

function MovieCard({ movie }) {
  return (
    <div className="movie-card">

      <img
        src={movie.poster}
        alt={movie.title}
        className="movie-poster"
      />

      <div className="movie-card-content">

        <h3>{movie.title}</h3>

        <p className="movie-genre">
          {movie.genre}
        </p>

        <div className="movie-info">
          <span>⭐ {movie.rating}</span>
          <span>⏱️ {movie.duration}</span>
        </div>

        <Link
          to={`/movie/${movie.id}`}
          className="view-btn"
        >
          View Details
        </Link>

      </div>
    </div>
  );
}

export default MovieCard;
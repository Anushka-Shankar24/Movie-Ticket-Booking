// import { Link, useParams } from "react-router-dom";
// import movies from "../data/movies";

// function MovieDetails() {
//   const { id } = useParams();

//   const movie = movies.find(
//     (item) => item.id === Number(id)
//   );

//   if (!movie) {
//     return (
//       <div className="page-container">
//         <div className="no-results">
//           <h2>Movie Not Found</h2>

//           <Link to="/movies" className="view-btn">
//             Back to Movies
//           </Link>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="movie-details-page">

//       <div className="movie-details-container">

//         {/* Movie Poster */}
//         <div className="details-poster">
//           <img
//             src={movie.poster}
//             alt={movie.title}
//           />
//         </div>

//         {/* Movie Information */}
//         <div className="details-content">

//           <h1>{movie.title}</h1>

//           <div className="details-rating">
//             ⭐ {movie.rating} / 10
//           </div>

//           <p className="details-description">
//             {movie.description}
//           </p>

//           <div className="details-info">

//             <div>
//               <strong>Genre</strong>
//               <span>{movie.genre}</span>
//             </div>

//             <div>
//               <strong>Language</strong>
//               <span>{movie.language}</span>
//             </div>

//             <div>
//               <strong>Duration</strong>
//               <span>{movie.duration}</span>
//             </div>

//             <div>
//               <strong>Release Date</strong>
//               <span>{movie.releaseDate}</span>
//             </div>

//           </div>

//           {/* Buttons */}
//           <div className="details-actions">

//             <Link
//               to={`/shows/${movie.id}`}
//               className="book-btn"
//             >
//               Book Tickets 🎟️
//             </Link>

//             <Link
//               to="/movies"
//               className="back-btn"
//             >
//               ← Back
//             </Link>

//           </div>

//         </div>

//       </div>

//       {/* Trailer Section */}
//       {movie.trailer && (
//         <section className="trailer-section">

//           <div className="trailer-header">
//             <div>
//               <span className="trailer-label">
//                 OFFICIAL TRAILER
//               </span>

//               <h2>
//                 🎬 Watch {movie.title} Trailer
//               </h2>
//             </div>

//             <a
//               href={`https://www.youtube.com/watch?v=${movie.trailer}`}
//               target="_blank"
//               rel="noopener noreferrer"
//               className="youtube-btn"
//             >
//               ▶ Watch on YouTube
//             </a>
//           </div>

//           <div className="trailer-wrapper">

//             <iframe
//               src={`https://www.youtube.com/embed/${movie.trailer}`}
//               title={`${movie.title} Trailer`}
//               allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
//               allowFullScreen
//             ></iframe>

//           </div>

//         </section>
//       )}

//     </div>
//   );
// }

// export default MovieDetails;








import { Link, useParams } from "react-router-dom";
import movies from "../data/movies";

function MovieDetails() {
  const { id } = useParams();

  const movie = movies.find((item) => item.id === Number(id));

  if (!movie) {
    return (
      <div className="not-found">
        <h2>Movie Not Found</h2>
        <Link to="/movies" className="back-btn">
          ← Back to Movies
        </Link>
      </div>
    );
  }

  return (
    <div className="movie-details-page">
      <div className="movie-details-container">

        {/* Movie Poster */}
        <div className="movie-details-poster">
          <img src={movie.poster} alt={movie.title} />
        </div>

        {/* Movie Information */}
        <div className="movie-details-content">
          <h1>{movie.title}</h1>

          <div className="movie-meta">
            <span>⭐ {movie.rating}</span>
            <span>🎭 {movie.genre}</span>
            <span>🗣️ {movie.language}</span>
            <span>⏱️ {movie.duration}</span>
            <span>📅 {movie.releaseDate}</span>
          </div>

          <p className="movie-description">
            {movie.description}
          </p>

          <div className="movie-actions">
            <Link
              to={`/shows/${movie.id}`}
              className="book-ticket-btn"
            >
              🎟️ Book Tickets
            </Link>

            <Link to="/movies" className="back-btn">
              ← Back to Movies
            </Link>
          </div>
        </div>
      </div>

      {/* Trailer */}
      <section className="trailer-section">
        <h2>🎬 Movie Trailer</h2>

        <div className="trailer-container">
          <iframe
            src={`https://www.youtube.com/embed/${movie.trailer}`}
            title={`${movie.title} Trailer`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </section>
    </div>
  );
}

export default MovieDetails;
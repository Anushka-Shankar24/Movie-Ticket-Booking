import { useState } from "react";
import movies from "../data/movies";
import MovieCard from "../components/MovieCard";

function Movies() {
  const [search, setSearch] = useState("");
  const [genre, setGenre] = useState("All");

  const genres = [
    "All",
    "Action",
    "Romance",
    "Comedy",
    "Drama",
    "Thriller",
    "Sports",
    "Biography",
    "Fantasy",
    "War",
    "Devotional",
    "Epic",
    "Spy Thriller",
  ];

  const filteredMovies = movies.filter((movie) => {
    const searchText = search.toLowerCase();

    const matchesSearch =
      movie.title.toLowerCase().includes(searchText) ||
      movie.genre.toLowerCase().includes(searchText);

    const matchesGenre =
      genre === "All" || movie.genre.includes(genre);

    return matchesSearch && matchesGenre;
  });

  return (
    <div className="movies-page">

      {/* Page Header */}
      <section className="movies-header">
        <h1>🎬 All Movies</h1>
        <p>
          Explore movies and choose your favorite one to book tickets.
        </p>
      </section>

      {/* Search & Filter */}
      <section className="movie-controls">

        <div className="search-box">
          <input
            type="text"
            placeholder="Search movie..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="genre-filter">
          <select
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
          >
            {genres.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>

      </section>

      {/* Movie Count */}
      <div className="movies-result">
        <p>
          Showing <strong>{filteredMovies.length}</strong> movie
          {filteredMovies.length !== 1 ? "s" : ""}
        </p>
      </div>

      {/* Movies */}
      <section className="movies-list">

        {filteredMovies.length > 0 ? (
          <div className="movie-grid">
            {filteredMovies.map((movie) => (
              <MovieCard
                key={movie.id}
                movie={movie}
              />
            ))}
          </div>
        ) : (
          <div className="no-movies">
            <h2>😔 No Movies Found</h2>
            <p>
              Try searching with another movie name or genre.
            </p>
          </div>
        )}

      </section>

    </div>
  );
}

export default Movies;
const dns = require("dns");
dns.setServers(["8.8.8.8", "1.1.1.1"]);

require("dotenv").config();

const connectDB = require("./config/db");
const Movie = require("./models/Movie");
const movies = require("./data/movieSeed");

const seedMovies = async () => {
  try {
    await connectDB();

    for (const movieData of movies) {
      const existingMovies = await Movie.find({
        title: movieData.title,
      });

      if (existingMovies.length > 0) {
        await Movie.updateMany(
          { title: movieData.title },
          { $set: movieData },
          { runValidators: true }
        );

        console.log(
          `Updated: ${movieData.title} (${existingMovies.length} existing record(s))`
        );
      } else {
        await Movie.create(movieData);

        console.log(`Created: ${movieData.title}`);
      }
    }

    const count = await Movie.countDocuments();

    console.log(`\nMovie seed completed successfully!`);
    console.log(`Total movie documents: ${count}`);

    process.exit(0);
  } catch (error) {
    console.error("Movie Seed Error:", error);
    process.exit(1);
  }
};

seedMovies();
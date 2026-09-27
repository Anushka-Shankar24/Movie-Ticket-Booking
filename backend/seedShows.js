const dns = require("dns");
dns.setServers(["8.8.8.8", "1.1.1.1"]);

require("dotenv").config();

const connectDB = require("./config/db");

const Movie = require("./models/Movie");
const Theatre = require("./models/Theatre");
const Show = require("./models/Show");

const theatreTimings = {
  "PVR Cinemas": [
    "10:00 AM",
    "1:00 PM",
    "5:00 PM",
    "8:00 PM",
  ],

  Cinepolis: [
    "11:00 AM",
    "2:00 PM",
    "6:00 PM",
    "9:00 PM",
  ],

  INOX: [
    "10:30 AM",
    "1:30 PM",
    "5:30 PM",
    "8:30 PM",
  ],
};

const getDate = (daysFromToday) => {
  const date = new Date();

  date.setDate(date.getDate() + daysFromToday);
  date.setHours(0, 0, 0, 0);

  return date;
};

const seedShows = async () => {
  try {
    await connectDB();

    const movies = await Movie.find();
    const theatres = await Theatre.find();

    if (movies.length === 0) {
      console.log("No movies found in database.");
      process.exit(1);
    }

    if (theatres.length === 0) {
      console.log("No theatres found in database.");
      process.exit(1);
    }

    console.log(`\nMovies found: ${movies.length}`);
    console.log(`Theatres found: ${theatres.length}\n`);

    let createdCount = 0;
    let skippedCount = 0;

    for (const movie of movies) {
      for (const theatre of theatres) {
        const timings =
          theatreTimings[theatre.name] || [
            "10:00 AM",
            "1:00 PM",
            "5:00 PM",
            "8:00 PM",
          ];

        for (let day = 0; day < 4; day++) {
          const showDate = getDate(day);

          for (const time of timings) {
            const existingShow = await Show.findOne({
              movie: movie._id,
              theatre: theatre._id,
              date: showDate,
              time: time,
            });

            if (existingShow) {
              skippedCount++;
              continue;
            }

            await Show.create({
              movie: movie._id,
              theatre: theatre._id,
              location: theatre.city || "Patna",
              date: showDate,
              time: time,
            });

            createdCount++;

            console.log(
              `Created: ${movie.title} | ${theatre.name} | ${time}`
            );
          }
        }
      }
    }

    const totalShows = await Show.countDocuments();

    console.log("\n========================================");
    console.log("Show seed completed successfully!");
    console.log(`New shows created: ${createdCount}`);
    console.log(`Existing shows skipped: ${skippedCount}`);
    console.log(`Total show documents: ${totalShows}`);
    console.log("========================================\n");

    process.exit(0);
  } catch (error) {
    console.error("Show Seed Error:", error);
    process.exit(1);
  }
};

seedShows();
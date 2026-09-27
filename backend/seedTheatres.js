const dns = require("dns");
dns.setServers(["8.8.8.8", "1.1.1.1"]);

require("dotenv").config();

const connectDB = require("./config/db");
const Theatre = require("./models/Theatre");

const theatres = [
  {
    name: "PVR Cinemas",
    location: "Patna Central Mall",
    city: "Patna",
    screens: 5,
    facilities: ["AC", "Parking", "Food Court"],
  },
  {
    name: "Cinepolis",
    location: "Patna Mall",
    city: "Patna",
    screens: 4,
    facilities: ["AC", "Parking", "Food Court"],
  },
  {
    name: "INOX",
    location: "Patna City Centre",
    city: "Patna",
    screens: 4,
    facilities: ["AC", "Parking", "Food Court"],
  },
];

const seedTheatres = async () => {
  try {
    await connectDB();

    for (const theatreData of theatres) {
      const existingTheatre = await Theatre.findOne({
        name: theatreData.name,
        city: theatreData.city,
      });

      if (existingTheatre) {
        await Theatre.updateOne(
          { _id: existingTheatre._id },
          { $set: theatreData }
        );

        console.log(`Updated: ${theatreData.name}`);
      } else {
        await Theatre.create(theatreData);

        console.log(`Created: ${theatreData.name}`);
      }
    }

    const count = await Theatre.countDocuments();

    console.log("\n================================");
    console.log("Theatre seed completed successfully!");
    console.log(`Total theatre documents: ${count}`);
    console.log("================================\n");

    process.exit(0);
  } catch (error) {
    console.error("Theatre Seed Error:", error);
    process.exit(1);
  }
};

seedTheatres();
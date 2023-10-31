const Sighting = require("./db/models/sighting.js"); // Adjust this path to your Sighting model
const jsonData = require("./sightings.json"); // Adjust this path to your JSON file

const migrateData = async () => {
  const formattedData = jsonData.map((entry) => ({
    date: new Date(
      `${entry.YEAR}-${entry.MONTH || "01"}-${entry.DATE || "01"}`
    ),
    location: `${entry.LOCATION_DETAILS || ""}, ${entry.COUNTY}, ${
      entry.STATE
    }, USA`,
    notes: entry.OBSERVED,
  }));

  try {
    await Sighting.bulkCreate(formattedData);
    console.log("Data migration successful!");
  } catch (error) {
    console.error("Error migrating data:", error);
  }
};

migrateData();

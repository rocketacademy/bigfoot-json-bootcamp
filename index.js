const express = require("express");
const { getSightings } = require("./utils.js");
require("dotenv").config();

const PORT = process.env.PORT;
const app = express();

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

app.get("/sightings", async (req, res, next) => {
  const sightings = await getSightings();

  const year = req.query.year;
  const sort = req.query.sort;

  let result = sightings;

  if (year) {
    // Filter sightings by year if a year query parameter is provided
    result = result.filter((sighting) => sighting.YEAR == year);
  }

  if (sort) {
    switch (sort) {
      case "Oldest sighting first":
        sightings.sort((a, b) => new Date(a.YEAR) - new Date(b.YEAR));
        break;
      case "Newest sighting first":
        sightings.sort((a, b) => new Date(b.YEAR) - new Date(a.YEAR));
        break;
      case "A to Z by State":
        sightings.sort((a, b) => (a.STATE || "").localeCompare(b.STATE || ""));
        break;
      case "Z to A by State":
        sightings.sort((a, b) => (b.STATE || "").localeCompare(a.STATE || ""));
        break;
      case "A to Z by Season":
        sightings.sort((a, b) =>
          (a.SEASON || "").localeCompare(b.SEASON || "")
        );
        break;
      case "Z to A by Season":
        sightings.sort((a, b) =>
          (b.SEASON || "").localeCompare(a.SEASON || "")
        );
        break;
    }
  }

  // If no year query parameter is provided, return all sightings
  res.json(result);
});

app.get("/sightings/:reportNumber", async (req, res) => {
  const sightings = await getSightings();
  const reportNumber = req.params.reportNumber;

  const sighting = sightings.find(
    (sighting) => sighting.REPORT_NUMBER === reportNumber
  );

  if (!sighting) {
    // If no sighting with the given report number was found, return a 404 error
    res.status(404).json({ error: "Sighting not found" });
    return;
  }

  res.json(sighting);
});

app.listen(PORT, () => {
  console.log(`Express app listening on port ${PORT}!`);
});
